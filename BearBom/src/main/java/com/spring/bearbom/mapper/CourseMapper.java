package com.spring.bearbom.mapper;

import java.util.List;
import java.util.Map;

import com.spring.bearbom.entity.Course;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.web.bind.annotation.RequestBody;

@Mapper
public interface CourseMapper {
	List<Map<String, Object>> getLocationCodeList();
	
	List<Map<String, Object>> getCategoryCodeList();

	List<Map<String, Object>> getCourseList();

	List<Map<String, Object>> getSearchProducts(Map<String, Object> paramMap);
	

	List<Map<String, Object>> getCourseOpened();
	
	List<Map<String, Object>> getMyOpenedClassList(String userId);

	int getNextFileIdx(int courseIdx);

	void updateCourseUseYnByDay();

	void setSqlSafe();

	List<Map<String, Object>> getTakenClassList(String userId);
	
	List<Map<String, Object>> getAllCourseList();
	
	void updateCourseStatus(@RequestBody Map<String, Object> paramMap);
	
	void deleteCourseStatus(@RequestBody Map<String, Object> paramMap);
}
