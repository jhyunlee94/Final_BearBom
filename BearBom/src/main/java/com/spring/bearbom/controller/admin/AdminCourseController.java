package com.spring.bearbom.controller.admin;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.bearbom.service.course.CourseService;

@RestController
@RequestMapping("/api/admin")
public class AdminCourseController {
	@Autowired
	private CourseService courseService;
	
	// 강좌 관리 게시물 불러오기
	@GetMapping("/getAllCourseList")
	public Map<String, Object> getAllCourseList() {
		try {
			Map<String, Object> returnMap = new HashMap<String, Object>();
			
			List<Map<String, Object>> allCourseList = courseService.getAllCourseList();
			
			returnMap.put("allCourseList", allCourseList);
			
			return returnMap;
		} catch(Exception e) {
			Map<String, Object> errorMap = new HashMap<String, Object>();
			
			errorMap.put("error", e.getMessage());
			
			return errorMap;
		}
	}
	
	// 게시물 승인 처리
	@PostMapping("/updateCourseStatus")
	public void updateCourseStatus(@RequestBody Map<String, Object> paramMap) {
		courseService.updateCourseStatus(paramMap);
	}
	
	// 게시물 삭제 처리
	@PostMapping("/deleteCourseStatus")
	public void deleteCourseStatus(@RequestBody Map<String, Object> paramMap) {
		courseService.deleteCourseStatus(paramMap);
	}
	
}
