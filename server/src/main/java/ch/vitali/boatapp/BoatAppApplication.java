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
	public CommandLineRunner boatList(BoatRepository repository) {
		return (args) -> {
			repository.save(new Boat("Small Boat", "This is a tiny boat."));
			repository.save(new Boat("Nice Boat", "Among all the boats, this one is the prettiest."));
			repository.save(new Boat("Big Boat", "You can invite your whole fammily on this boat!"));
			repository.save(new Boat("Yacht", "Father of all boats, you can show off what you have with this one."));
		};
	}
}
