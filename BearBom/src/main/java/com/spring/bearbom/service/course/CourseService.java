package com.spring.bearbom.service.course;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestBody;

import com.spring.bearbom.dto.LikeDto;
import com.spring.bearbom.entity.Course;
import com.spring.bearbom.entity.CourseFile;
import com.spring.bearbom.entity.Notice;

public interface CourseService {

	void courseRegistration(Course course);

	void courseFileSave(List<CourseFile> fileList);

	int findCourseIdx(int i);
	
	List<Map<String, Object>> getLocationCodeList();
	
	List<Map<String, Object>> getCategoryCodeList();

    List<Map<String, Object>> getCourseList();

	List<Map<String, Object>> getSearchProducts(Map<String, Object> paramMap);

	
	List<Map<String, Object>> getMyOpenedClassList(String userId);


	int findCourseFileIdxByCourseIdx(int i);

	void updateCourseUseYnByDay();

	void setSqlSafe();


	List<Map<String, Object>> getTakenClassList(String userId);
	
	//관리자페이지 강좌 관리 게시물 뿌려주는 부분
	List<Map<String, Object>> getAllCourseList();
	
	//관리자페이지 게시물 승인 처리 부분
	void updateCourseStatus(@RequestBody Map<String, Object> paramMap);
	
	//관리자페이지 게시물 삭제 처리 부분
	void deleteCourseStatus(@RequestBody Map<String, Object> paramMap);
}

