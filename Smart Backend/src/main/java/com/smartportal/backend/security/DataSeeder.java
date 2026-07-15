package com.smartportal.backend.security;

import com.smartportal.backend.entity.User;
import com.smartportal.backend.enums.Role;
import com.smartportal.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.List;
import org.springframework.security.crypto.password.PasswordEncoder;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            String encodedPassword = passwordEncoder.encode("password");
            
            User admin = User.builder()
                    .name("Admin User")
                    .email("admin@test.com")
                    .password(encodedPassword)
                    .role(Role.ADMIN)
                    .build();

            User agent = User.builder()
                    .name("Support Agent")
                    .email("agent@test.com")
                    .password(encodedPassword)
                    .role(Role.AGENT)
                    .build();

            User customer = User.builder()
                    .name("John Doe (Customer)")
                    .email("customer@test.com")
                    .password(encodedPassword)
                    .role(Role.CUSTOMER)
                    .build();

            userRepository.save(admin);
            userRepository.save(agent);
            userRepository.save(customer);
            
            System.out.println("Default users seeded into the database.");
        } else {
            // Hotfix: Encrypt plaintext passwords if they still exist from previous seed
            List<User> allUsers = userRepository.findAll();
            boolean updated = false;
            for (User user : allUsers) {
                if ("password".equals(user.getPassword())) {
                    user.setPassword(passwordEncoder.encode("password"));
                    userRepository.save(user);
                    updated = true;
                }
            }
            if (updated) {
                System.out.println("Updated plaintext passwords to BCrypt.");
            }
        }
    }
}
