package com.spring.bearbom.controller.order;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.bearbom.dto.OrderDTO;
import com.spring.bearbom.entity.Course;
import com.spring.bearbom.entity.Order;
import com.spring.bearbom.entity.User;
import com.spring.bearbom.service.order.OrderService;
import com.spring.bearbom.service.user.UserService;

@RestController
@RequestMapping("/api/order")
public class OrderController {
	@Autowired
	OrderService orderService;
	
	@Autowired
	UserService userService;
	
	@PostMapping("/orderRegistration")
	public void courseRegistration(HttpServletRequest request, @RequestBody Map<String, Object> paramMap,
			@AuthenticationPrincipal String userId) {

		Order order = new Order();
		User user = new User();
		Course course = new Course();
		course.setCourseIdx(Integer.parseInt(String.valueOf(paramMap.get("courseIdx"))));
		order.setCourse(course);
		user.setUserId(userId);
		order.setUser(user);
		LocalDateTime regDate = LocalDateTime.now().plusHours(9);
		order.setOrderRegdate(regDate);
		int orderIdx = orderService.findOrderIdx(0);
		order.setOrderIdx(orderIdx);
		
		orderService.orderRegistration(order);
		
	}
	
	@GetMapping("/getOrderList")
	public Map<String, Object> getOrderList(@AuthenticationPrincipal String userId){
		System.out.println("------------getOrderList시작---------");
		try {
          Map<String, Object> resultMap = new HashMap<String, Object>();
          List<Course> getOrderedCourseList = orderService.getOrderedCourseListByUser(userId);
          resultMap.put("getOrderedCourseList", getOrderedCourseList);
          System.out.println(resultMap);
          return resultMap;
          
      } catch (Exception e) {
          Map<String, Object> errorMap = new HashMap<String, Object>();
          errorMap.put("error",e.getMessage());
          return errorMap;
          
      }
	}
	
	@PostMapping("/updateOrderYn")
	public void updateOrderYn(HttpServletRequest request, 
			@RequestBody Map<String, Object> paramMap,
			@AuthenticationPrincipal String userId) {
		System.out.println("------------updateOrderYn시작---------");
		System.out.println("paramMap :  "+paramMap);
		System.out.println(Integer.parseInt(String.valueOf(paramMap.get("courseIdx"))));
		int courseIdx = (Integer.parseInt(String.valueOf(paramMap.get("courseIdx"))));
		OrderDTO orderDto = new OrderDTO();
		orderDto.setCourseIdx(courseIdx);
		orderDto.setUserId(userId);
		Order order = orderService.getOrder(orderDto);
		
		Order orderTemp = orderService.findByOrderIdx(order.getOrderIdx());
		System.out.println("1991" +orderTemp);
		
		Course course = new Course();
		course.setCourseIdx(courseIdx);
		orderTemp.setCourse(course);
		System.out.println("courseCom");
		
		User user = new User();
		user.setUserId(userId);
		orderTemp.setUser(user);
		System.out.println("userCom");
		
		orderTemp.setOrderPri(Integer.parseInt(String.valueOf(paramMap.get("orderPri"))));
		orderTemp.setOrderNm(String.valueOf(paramMap.get("orderNm")));
		orderTemp.setPgNm(String.valueOf(paramMap.get("pgNm")));
		orderTemp.setPaymentMethod(String.valueOf(paramMap.get("paymentMethod")));
		LocalDateTime payDate = LocalDateTime.now().plusHours(9);
		orderTemp.setPaymentDate(payDate);
		orderTemp.setOrderYn('Y');
		System.out.println("-=-=-=-=-=-=-=-=-=-=-~~~~");
		System.out.println(orderTemp);
		orderService.updateOrderYn(orderTemp);
		
	}
	
	
	@GetMapping("/allOrderList")
	public Map<String, Object> allOrderList(@AuthenticationPrincipal String userId){
		System.out.println("------------allOrderList시작---------");
		try {
          Map<String, Object> resultMap = new HashMap<String, Object>();
          User checkUser = userService.getUser(userId);
          String userRole = checkUser.getRole();
          if(userRole=="ROLE_ADMIN") {
          List<Course> allOrderList = orderService.getAllOrderList();
          resultMap.put("allOrderList", allOrderList);
          System.out.println(resultMap);
          return resultMap;
          }else {
        	  List<Course> noList = new ArrayList<>();
        	  resultMap.put("no Puedes Acceptar", noList);
        	return resultMap;
          }
          
      } catch (Exception e) {
          Map<String, Object> errorMap = new HashMap<String, Object>();
          errorMap.put("error",e.getMessage());
          return errorMap;
          
      }
	}
}