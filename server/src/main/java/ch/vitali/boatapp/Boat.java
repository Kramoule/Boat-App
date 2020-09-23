package ch.vitali.boatapp;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "boats")
public class Boat {

    private @Id @GeneratedValue Long id;
    private String name = "";
    private String description ="";
    private String photoPath = "";

    public Boat(){}

    public Boat(String name, String description){
        this.name = name;
        this.description = description;
    }

    public Boat(String name, String description, String photoPath){
        this(name, description);
        this.photoPath = photoPath;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Boat boat = (Boat) o;
        return id.equals(boat.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Boat{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", photoPath='" + photoPath + '\'' +
                '}';
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getPhotoPath() {
        return photoPath;
    }

    public void setPhotoPath(String photoPath) {
        this.photoPath = photoPath;
    }

    public void setName(String newName){
        this.name = newName;
    }

    public void setDescription(String newDescription){
        this.description = newDescription;
    }
}
