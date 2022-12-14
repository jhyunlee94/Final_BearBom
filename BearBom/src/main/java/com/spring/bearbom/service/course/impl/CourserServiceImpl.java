package com.spring.bearbom.service.course.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.bearbom.entity.Course;
import com.spring.bearbom.entity.CourseFile;
import com.spring.bearbom.entity.Courser;
import com.spring.bearbom.entity.User;
import com.spring.bearbom.mapper.CourseFileMapper;
import com.spring.bearbom.mapper.CourserMapper;
import com.spring.bearbom.repository.CourserRepository;
import com.spring.bearbom.service.course.CourserService;

@Service
public class CourserServiceImpl implements CourserService {

    @Autowired
    private CourserRepository courserRepository;

    @Autowired
    private CourserMapper courserMapper;
    
    @Autowired
    private CourseFileMapper courseFileMapper;

    @Override
    public List<Courser> Review(Courser courser) {
        List<Courser> reviewList  = courserRepository.findByCourseOrderByCourserIdxDesc(courser.getCourse());
        for(Courser courser1 : reviewList) {
    		System.out.println(courser1.toString());
    	}
        return reviewList;
    }

    @Override
    public Courser WriteReview(Courser courser) {
        int courserIdx = courserRepository.selectNextCourserIdx(courser.getCourse().getCourseIdx());
        courser.setCourserIdx(courserIdx);
        return courserRepository.save(courser);
    }

    @Override
	public double updateRating(int courseIdx) {
		// TODO Auto-generated method stub
		return courserMapper.updateRating(courseIdx);
	}

	@Override
	public double updateRating1(Courser courser) {
		// TODO Auto-generated method stub
		return courserMapper.updateRating1(courser);
	}

	@Override
    public Course getCourse(int courseIdx) {
        Course course = courserMapper.getCourse(courseIdx);
        User teacherInfo = courserMapper.getTeacherInfo(courseIdx);
        course.setUser(teacherInfo);
        return course;
    }

	@Override
	public void updateCourseCnt(int courseIdx) {
		// TODO Auto-generated method stub
		courserMapper.updateCourseCnt(courseIdx);
	}

	@Override
	public List<CourseFile> getCourseFile(int courseIdx) {
		return courseFileMapper.getCourseFileList(courseIdx);
	}
	
	@Override
	public int getCourseCurCnt(String userId) {
		return courserMapper.getCourseCurCnt(userId);
	}

	@Override
	public List<User> userInfo(String userId) {
		// TODO Auto-generated method stub
		return courserMapper.userInfo(userId);
	}
	

}