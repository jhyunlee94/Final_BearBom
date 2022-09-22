package com.spring.bearbom.mapper;

import com.spring.bearbom.dto.InquiryDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

@Mapper
public interface MypageMapper {

    List<Map<String, Object>> getInquiryReference(String userId);
    
    // 유저 탈퇴 Y->N 0922
    void deleteUserInfo(String userId);
}
