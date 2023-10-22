package com.sunbasedata.customer.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import com.sunbasedata.customer.entity.Customer;
import com.sunbasedata.customer.repository.RepoCustomer;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
public class Maincontroller {
    @Autowired
    private RepoCustomer repoCustomer;

    @GetMapping(value="/getAllCustomers")
    public List<Customer> getAllCustomers() {
        List<Customer> list = repoCustomer.findAll();
        return list;
    }

    @PostMapping(value="/saveCustomer")
    public Customer saveCustomer(@RequestBody Customer customer) {
        
        repoCustomer.save(customer);
        return customer;
    }

    @DeleteMapping(value="/deleteCustomer/{id}")
    public ResponseEntity<String> deleteCustomer(@PathVariable int id)
    {
        repoCustomer.deleteById(id);
        return(ResponseEntity.ok("deleted!"));   
    }

    @PostMapping(value = "/updateCustomer/{id}")
    public Customer updateCustomer(@PathVariable int id, @RequestBody Customer updateCustomer)
    {
        Customer customer= repoCustomer.findById(id).get();

        if(customer == null)
        {
            ResponseEntity.notFound().build();
        }
        customer.setFirstName(customer.getFirstName());
        customer.setLastName(customer.getLastName());
        customer.setCity(customer.getCity());
        customer.setState(customer.getState());
        customer.setEmail(customer.getEmail());
        customer.setNumber(customer.getNumber());
        customer.setAddress(customer.getAddress());

        repoCustomer.save(customer);
        return customer;
    }

    @GetMapping(value = "/getCustomer/{id}")
    public ResponseEntity<Customer> getCustomerById (@PathVariable int id)
    {
        Customer customer = repoCustomer.findById(id).orElse(null);

        if(customer == null)
        {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else {
            return new ResponseEntity<>(customer, HttpStatus.OK);
        }
    }
}
