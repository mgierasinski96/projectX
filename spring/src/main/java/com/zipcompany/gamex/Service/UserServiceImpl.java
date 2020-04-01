package com.zipcompany.gamex.Service;

import com.zipcompany.gamex.domain.User;
import com.zipcompany.gamex.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public User safeUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUser(Long id) {
        return userRepository.findUserById(id);
    }

    @Override
    public List<User> getAllUsersByLvlDesc() {
        return userRepository.findAllByOrderByLevelDesc();
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    @Override
    public List<User> getUsersWhoFinishedWorking()
    {
        return userRepository.getUsersWhoFinishedWorking();
    }
    public User endWorking(User worker)
    {
        try {

        Calendar cal = Calendar.getInstance();
        cal.setTime(worker.getWorkBeginDate());
        cal.add(Calendar.MINUTE, worker.getHowLongWorking()); // adds one hour
        Date endDate=cal.getTime();
        Date now=new Date();
        if(endDate.getTime() - now.getTime()<=0)
        {
            if(worker.getTypeOfWork().equals("mining"))
            {
            worker.setPremium_curr(worker.getPremium_curr() + worker.getWorkReward());
            worker.setWorking(false);
            worker.setWorkBeginDate(null);
            worker.setWorkReward(0);
            worker.setTypeOfWork(null);
            worker.setHowLongWorking(0);
            System.out.println("NAGRODA ODEBRANA W POSTACI WALUTY PREMIUM");
            }
        }
        else
            System.out.println("JESZCZE NIE SKOŃCZYŁEŚ PRACY ZOSTAŁO SEKUND: " + (endDate.getTime() - now.getTime())/1000);
        }
        catch (NullPointerException ex) {
            System.out.println("USER NIE PRACUJE, A CHCE ODEBRAĆ NAGRODĘ");
        }

        return  worker;
    }

}
