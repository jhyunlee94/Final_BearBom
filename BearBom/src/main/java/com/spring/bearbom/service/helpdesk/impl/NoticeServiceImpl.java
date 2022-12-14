package com.spring.bearbom.service.helpdesk.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.bearbom.dto.NoticeDTO;
import com.spring.bearbom.entity.Notice;
import com.spring.bearbom.mapper.NoticeMapper;
import com.spring.bearbom.repository.NoticeRepository;
import com.spring.bearbom.service.helpdesk.NoticeService;

@Service
public class NoticeServiceImpl implements NoticeService{

//	@Autowired
//	private NoticeRepository noticeRepository;
	
	@Autowired
	private NoticeMapper noticeMapper;

	// 그냥 보여주는것
	@Override
	public List<Notice> notice1(Notice notice) {
		
		List<Notice> notice3 = noticeMapper.notice1(notice);
		return notice3;
	}

	@Override
	public void insertNotice(NoticeDTO noticeDTO) {
		// TODO Auto-generated method stub
		noticeMapper.insertNotice(noticeDTO);
	}

//	@Override
//	public void updateNotice(NoticeDTO noticeDTO) {
//		// TODO Auto-generated method stub
//		noticeMapper.updateNotice(noticeDTO);
//	}

	@Override
	public void mdfNotice(NoticeDTO noticeDTO) {
		noticeMapper.mdfNotice(noticeDTO);
		
	}

	@Override
	public void updateNotice(Integer id) {
		// TODO Auto-generated method stub
		noticeMapper.updateNotice(id);
	}

//	@Override
//	public void updateNotice(Map<String, Object> paramMap) {
//	// TODO Auto-generated method stub
//	noticeMapper.updateNotice(paramMap);
//}


//	@Override
//	public Notice insertNotice(Notice notice) {
//		// TODO Auto-generated method stub
//		int noticeIdx = noticeRepository.selectNextnoticeIdx();
//		notice.setNoticeIdx(noticeIdx);
//		return noticeRepository.save(notice);
//	}

	
	
	//백단에 저장
	
}
