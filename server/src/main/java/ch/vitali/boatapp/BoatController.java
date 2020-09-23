package ch.vitali.boatapp;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class BoatController {

    private final BoatRepository repository;

    BoatController(BoatRepository repo){
        this.repository = repo;
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/boats")
    public List<Boat> getBoats() {
        return repository.findAll();
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/boats")
    public Boat addBoat(@RequestBody Boat boat) {
        return repository.save(boat);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/boats/{id}")
    public void removeBoat(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
