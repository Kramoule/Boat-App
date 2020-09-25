package ch.vitali.boatapp;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import javax.persistence.Entity;

@JsonSerialize
public class Response {

    private String content;

    public Response(String content) {
        this.content = content;
    }

    @JsonGetter("content")
    public String getContent() {
        return content;
    }
}
