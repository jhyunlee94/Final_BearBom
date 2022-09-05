package com.spring.bearbom.service.courseR.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.bearbom.entity.Courser;
import com.spring.bearbom.repository.CourserRepository;
import com.spring.bearbom.service.courseR.CourseRService;

@Service
public class CourseRServiceImpl implements CourseRService {

    @Autowired
    private CourserRepository courserRepository;

    @Override
    public List<Courser> Review(Courser courser) {
     List<Courser> reviewList  = courserRepository.findByCourse(courser.getCourse());

     return reviewList;
    }
}