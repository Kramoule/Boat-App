package ch.vitali.boatapp;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BoatAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(BoatAppApplication.class, args);
	}

	// Populate the initial DB with default boats
	@Bean
	public CommandLineRunner boatList(BoatRepository boatRepo, UserRepository userRepo) {
		return (args) -> {
			boatRepo.save(new Boat("Small Boat", "This is a tiny boat."));
			boatRepo.save(new Boat("Nice Boat", "Among all the boats, this one is the prettiest."));
			boatRepo.save(new Boat("Big Boat", "You can invite your whole family on this boat!"));
			boatRepo.save(new Boat("Yacht", "Father of all boats, you can show off what you have with this one."));

			userRepo.save(new User("admin", IdentityUtils.hashPassword("password")));
		};
	}
}
