package com.spring.bearbom.controller.mypage2;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.bearbom.dto.InquiryDTO;
import com.spring.bearbom.service.mypage2.Mypage2Service;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/api/mypage2")
public class Mypage2Controller {

	@Autowired
	private Mypage2Service mypage2Service;
	
	
	//y 인것만 화면에 뿌려주는거
	@GetMapping("/getInquiryReference")
	public Map<String, Object> getInquiryReference(InquiryDTO inquiryDTO,@AuthenticationPrincipal String userId){
		try {
		inquiryDTO.setUserId(userId);
		List<Map<String, Object>> getInquiryReference1 = mypage2Service.getInquiryReference(inquiryDTO);
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("getInquiryReference1", getInquiryReference1);
		
		return resultMap;
		} catch(Exception e) {
			Map<String,Object> error = new HashMap<String,Object>();
			error.put("error", e.getMessage());
			return error;
		}
	}
	//y를 n으로 바꾸는 update
	@PostMapping("/updateInquiryReference")
	public void updateInquiryReference(@RequestBody InquiryDTO inquiryDTO, @AuthenticationPrincipal String userId){	
		inquiryDTO.setUserId(userId);
		System.out.println("before inquiryDTO : " +inquiryDTO);
		log.info("inquiryDTO : {}", inquiryDTO);
		mypage2Service.updateInquiryReference(inquiryDTO);
		System.out.println("after inquiryDTO : " +inquiryDTO);
	
	}
	
}