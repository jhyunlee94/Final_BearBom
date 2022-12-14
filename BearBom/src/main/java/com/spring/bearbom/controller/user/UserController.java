package com.spring.bearbom.controller.user;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.bearbom.dto.ResponseDTO;
import com.spring.bearbom.dto.UserDTO;
import com.spring.bearbom.entity.User;
import com.spring.bearbom.jwt.JwtTokenProvider;
import com.spring.bearbom.service.email.EmailService;
import com.spring.bearbom.service.mypage.MypageService;
import com.spring.bearbom.service.user.UserService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/user")
@Slf4j
public class UserController {
	@Autowired
	private UserService userService;
	
	@Autowired
	private MypageService mypageService;

	@Autowired
	private JwtTokenProvider jwtTokenProvider;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	 EmailService emailService;
	@PostMapping("/join")
	public ResponseEntity<?> join(@RequestBody User user) {
		

		try {
			System.out.println(passwordEncoder.getClass());
			user.setUserPw(passwordEncoder.encode(user.getUserPw()));
			System.out.println(user.getUserPw());
			//회원 가입 후 가입된 회원 정보 받아오는 객체 생성
			User joinUser = userService.join(user);

			//리액트로 리턴해 줄 MemberDTO 객체 생성
			UserDTO userDTO = new UserDTO();

			//member는 리스트로 리턴되는 게 아니여서 responseBody에 memberDTO를 담아서 리턴
			userDTO.setUserId(joinUser.getUserId());
			userDTO.setUserPw(joinUser.getUserPw());
			userDTO.setRole(joinUser.getRole());
			userDTO.setUserEmail(joinUser.getUserEmail()); 
			userDTO.setUserNm(joinUser.getUserNm());
			userDTO.setUserNickName(joinUser.getUserNickName());
			userDTO.setUserAddress(joinUser.getUserAddress());
			userDTO.setUserAddressDef(joinUser.getUserAddressDef());
			userDTO.setUserTel(joinUser.getUserTel());

			userDTO.setUserYn(joinUser.getUserYn());


			return ResponseEntity.ok().body(userDTO);
		} catch(Exception e) {
			ResponseDTO<UserDTO> response = new ResponseDTO<>();

			response.setError(e.getMessage());
			return ResponseEntity.badRequest().body(response);
		}
	}
	
	// 0926 비밀번호 수정 저장
	@PostMapping("/updateUserInfo")
	public ResponseEntity<?> updatePw(@RequestBody User user, @AuthenticationPrincipal String userId) {
		user.setUserPw(passwordEncoder.encode(user.getUserPw()));
		
		user.setUserId(userId);

		mypageService.updateUser(user);

		UserDTO userDTO = new UserDTO();

		return ResponseEntity.ok().body("success");
	}
	
	///////////////////////////////////////////////////////////////

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody User user, @AuthenticationPrincipal String userId) {
		System.out.println("/////////////////////////"+userId);
		
		//로그인 한 Member 객체 생성
		User loginUser = userService.login(user.getUserId(), user.getUserPw());

		if(loginUser != null && loginUser.getLoginFailMessage() == null) {
			//로그인된 유저에 대한 토큰 발행
			final String token = jwtTokenProvider.create(loginUser);

			//리턴해줄 MemberDTO 객체 생성
			final UserDTO userDTO = new UserDTO();
			userDTO.setUserId(loginUser.getUserId());
			userDTO.setUserPw(loginUser.getUserPw());
			userDTO.setRole(loginUser.getRole());


			//발행된 토큰 DTO에 담아서 리턴
			userDTO.setToken(token);

			log.info("userDTO: {}", userDTO);

			return ResponseEntity.ok().body(userDTO);
		} else {
			ResponseDTO<UserDTO> response = new ResponseDTO<>();
			response.setError(loginUser.getLoginFailMessage());
			return ResponseEntity.badRequest().body(response);
		}
	}


//	@PostMapping("/checkId")
//	public String checkId(@RequestBody User user) {
//		User idCheck = userService.idCheck(user.getUserId());
//		System.out.println(idCheck);
//		if(idCheck == null) {
//			return "idFail";
//		} else {
//			return "idOk";
//		}
//	}

	@PostMapping("/checkId")
	public int checkId(@RequestBody User user) {
		int result = userService.idDuplicate(user.getUserId());
		System.out.println(result);
		log.info("result: {}", result);

		return result;
	}

	@PostMapping("/emailConfirm")
//	@ApiOperation(value = "회원 가입시 이메인 인증", notes = "기존사용하고 있는 이메일을 통해 인증")
//	@ApiResponses({
//			@ApiResponse(code = 200, message = "성공"),
//			@ApiResponse(code = 401, message = "인증 실패"),
//			@ApiResponse(code = 404, message = "사용자 없음"),
//			@ApiResponse(code = 500, message = "서버 오류")
//	})
	public ResponseEntity<?> emailConfirm(@RequestBody  String data) throws Exception {

		System.out.println("/////////" +data);
		JSONParser parser = new JSONParser();
		Object obj = parser.parse(data);
		JSONObject jsonObj = (JSONObject) obj;

		String email = (String) jsonObj.get("userEmail");

		log.info("이메일 파싱 : {} ",email);

//		JSONObject parser = new JSONObject(data);
//		String      email = parser.getString("email");

		String confirm = emailService.sendSimpleMessage(email);
//		log.info("confirm: {}", confirm);
		return ResponseEntity.ok().body(confirm);
	}
	
	// admin 유저 정보 불러오기 0922
	@GetMapping("/getUserList")
    public Map<String, Object> getUserList(){
    	try {
    		Map<String, Object> returnMap = new HashMap<String, Object>();
    		
    		List<User> userList = userService.getUserList();
    		
    		returnMap.put("userList", userList);
    		
    		return returnMap;
    		
    	}catch(Exception e){
    		Map<String, Object> errorMap = new HashMap<String, Object>();
    		errorMap.put("error", e.getMessage());
    		return errorMap;
    	}
    };

	

}
