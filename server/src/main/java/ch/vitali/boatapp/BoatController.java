package ch.vitali.boatapp;

import org.springframework.web.bind.annotation.*;

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
    @GetMapping("/boats/{id}")
    public Boat getBoat(@PathVariable Long id) {
        return repository.getOne(id);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/boats")
    public Boat addBoat(@RequestBody Boat boat) {
        return repository.save(boat);
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/boats/{id}")
    public Boat updateBoat(@PathVariable Long id, @RequestBody Boat boat) {
        Boat oldBoat = repository.getOne(id);
        oldBoat.setName(boat.getName());
        oldBoat.setDescription(boat.getDescription());
        oldBoat.setPhotoPath(boat.getPhotoPath());
        return repository.save(oldBoat);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/boats/{id}")
    public void removeBoat(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
