package com.zipcompany.gamex.controller;


import com.zipcompany.gamex.domain.UserDetailsImpl;
import com.zipcompany.gamex.domain.ERole;
import com.zipcompany.gamex.domain.Role;
import com.zipcompany.gamex.domain.User;
import com.zipcompany.gamex.domain.UserBackpack;
import com.zipcompany.gamex.jwt.JwtUtils;
import com.zipcompany.gamex.payload.request.LoginRequest;
import com.zipcompany.gamex.payload.request.SignupRequest;
import com.zipcompany.gamex.payload.response.JwtResponse;
import com.zipcompany.gamex.payload.response.MessageResponse;
import com.zipcompany.gamex.repository.RoleRepository;
import com.zipcompany.gamex.repository.UserBackpackRepository;
import com.zipcompany.gamex.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    UserBackpackRepository userBackpackRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        System.out.println("ktos probuje sie dobic");

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles,
                userDetails.getLevel(),
                userDetails.getTotal_exp(),
                userDetails.getGold(),
                userDetails.getPremium_curr(),
                userDetails.getExp()
                ));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        System.out.println("Rejestracja");
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Email is already in use!"));
        }

        //TODO: DEPENDENCY INJECTION!!
        UserBackpack userBackpack = new UserBackpack("Czarny");
        User user = new User(
                "WR",
                encoder.encode(signUpRequest.getPassword()),
                signUpRequest.getEmail(),
                signUpRequest.getUsername(),
                new Date(),
                new Date(),
                0,
                0,
                1,
                0,
                0,
                userBackpack,
                null,
                null,
                false
        );
        userBackpackRepository.save(userBackpack);


//		// Create new user's account
//		User user = new User(signUpRequest.getUsername(),
//							 signUpRequest.getEmail(),
//							 encoder.encode(signUpRequest.getPassword()));

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);

                        break;
                    case "mod":
                        Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(modRole);

                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}
