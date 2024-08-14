package com.wecp.eventmanagementsystem.entity;
 
 
import com.fasterxml.jackson.annotation.JsonIgnore;
 
import javax.persistence.*;
 
@Entity
@Table(name = "allocations")
public class Allocation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long allocationID;
 
    @ManyToOne
    @JoinColumn(name = "eventID") // Foreign Key
    @JsonIgnore
    private Event event;
 
    @ManyToOne
    @JoinColumn(name = "resourceID") // Foreign Key
    private Resource resource;
 
    private int quantity;
 
 
    public Long getAllocationID() {
        return allocationID;
    }
 
    public void setAllocationID(Long allocationID) {
        this.allocationID = allocationID;
    }
 
    public Event getEvent() {
        return event;
    }
 
    public void setEvent(Event event) {
        this.event = event;
    }
 
    public Resource getResource() {
        return resource;
    }
 
    public void setResource(Resource resource) {
        this.resource = resource;
    }
 
    public int getQuantity() {
        return quantity;
    }
 
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
 