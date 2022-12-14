package com.spring.bearbom.controller.helpdesk;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.bearbom.dto.ResponseDTO;
import com.spring.bearbom.dto.UserDTO;
import com.spring.bearbom.entity.Guide;
import com.spring.bearbom.jwt.JwtTokenProvider;
import com.spring.bearbom.service.helpdesk.FaqService;

@RestController
@RequestMapping("/api/helpdesk")
public class FaqController {
	@Autowired
	private FaqService faqService;
	
	@Autowired
	private JwtTokenProvider jwtTokenProvider;
	
	@GetMapping("/getFaqList")
	public ResponseEntity<?> getFaqList(Guide guide) {
		try {

			List<Guide> faq = faqService.faq(guide);
	    	ResponseDTO<Guide> response = new ResponseDTO<Guide>();
	    	response.setData(faq);

			return ResponseEntity.ok().body(response);
		} catch(Exception e) {
			ResponseDTO<UserDTO> response = new ResponseDTO<>();

			response.setError(e.getMessage());
			return ResponseEntity.badRequest().body(response);
		}
	}
//	@GetMapping("/getFaqList")
//	public ResponseEntity<?> getFaqList(String test) {
//		test = "test";
//		return ResponseEntity.ok().body(test);
//	}

}
