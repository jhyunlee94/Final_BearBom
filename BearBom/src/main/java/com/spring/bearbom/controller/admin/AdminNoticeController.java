package com.spring.bearbom.controller.admin;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.bearbom.dto.NoticeDTO;
import com.spring.bearbom.entity.Notice;
import com.spring.bearbom.jwt.JwtTokenProvider;
import com.spring.bearbom.service.helpdesk.NoticeService;

@RestController
@RequestMapping("/api/admin")

public class AdminNoticeController {
	@Autowired
	private NoticeService noticeService;
	
	@Autowired
	private JwtTokenProvider jwtTokenProvider;

	
	//백단으로 보내서 저장시키는것
	@PostMapping("/insertNotice")
	public ResponseEntity<?> insertNotice(@RequestBody Notice notice, @AuthenticationPrincipal String userId){
		System.out.println(notice.getNoticeIdx());
		System.out.println(notice.getNoticeTitle());
		System.out.println(notice.getNoticeContent());
		System.out.println(notice.getNoticeRegdate());
		System.out.println(notice.getNoticeMdfdate());
		System.out.println(notice.getNoticeUseYn());
		System.out.println(userId);
		// 수강 중인 강좌를 위한 현재 날짜
		LocalDate date = LocalDate.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

		
		NoticeDTO noticeDTO = new NoticeDTO();
		
		noticeDTO.setNoticeIdx(notice.getNoticeIdx());
		noticeDTO.setNoticeTitle(notice.getNoticeTitle());
		noticeDTO.setNoticeContent(notice.getNoticeContent());
		noticeDTO.setNoticeRegdate(notice.getNoticeRegdate().format(formatter));
		noticeDTO.setNoticeMdfdate(notice.getNoticeMdfdate().format(formatter));
		noticeDTO.setNoticeUseYn(notice.getNoticeUseYn());
		noticeDTO.setUserId(userId);
		
		noticeService.insertNotice(noticeDTO);
		
		return ResponseEntity.ok().body(noticeDTO);
		
	}


	@PostMapping("updateNotice")
	public void updateNotice(@RequestBody Map<String, Object> paramMap) {
		noticeService.updateNotice(Integer.valueOf(String.valueOf(paramMap.get("id"))));
	}
	
	
	
//	@PostMapping("/updateNotice")
//	public void updateNotice(NoticeDTO noticeDTO){	
//		
//		System.out.println("before noticeDTO : " +noticeDTO);
//		noticeService.updateNotice(noticeDTO);
//		System.out.println("after noticeDTO : " +noticeDTO);
//	
//	}
	
	//정보 수정
	@PostMapping("/mdfNotice")
	public void mdfNotice(@RequestBody NoticeDTO noticeDTO) {
		noticeService.mdfNotice(noticeDTO);
	}


	
	
	
}
