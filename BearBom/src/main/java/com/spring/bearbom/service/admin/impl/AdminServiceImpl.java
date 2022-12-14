package com.spring.bearbom.service.admin.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.bearbom.dto.InquiryDTO;
import com.spring.bearbom.mapper.AdminInquiryMapper;
import com.spring.bearbom.mapper.AdminMapper;
import com.spring.bearbom.service.admin.AdminService;

@Service
public class AdminServiceImpl implements AdminService{

	@Autowired
	private AdminInquiryMapper adminInquiryMapper;

	@Autowired
	private AdminMapper adminMapper;

	@Override
	public List<InquiryDTO> inquiryInfoReference() {
		// TODO Auto-generated method stub
		return adminInquiryMapper.adminInquiryMapper();
	}

	@Override
	public List<Map<String, Object>> totalSales() {
		return adminMapper.totalSales();
	}

	@Override
	public List<Map<String, Object>> totalOrders() {
		return adminMapper.totalOrders();
	}

	@Override
	public List<Map<String, Object>> totalUsers() {
		return adminMapper.totalUsers();
	}

	@Override
	public List<Map<String, Object>> totalCourses() {
		return adminMapper.totalCourses();
	}

	@Override
	public List<Map<String, Object>> orderList() {
		return adminMapper.orderList();
	}

	@Override
	public List<Map<String, Object>> todaySales() {
		return adminMapper.todaySales();
	}

	@Override
	public void updateInquiry(Integer id) {
		adminInquiryMapper.updateInquiry(id);
	}


	@Override
	public List<Map<String, Object>> getAdminOrderList() {
		return adminMapper.getAdminOrderList();
	}


}
