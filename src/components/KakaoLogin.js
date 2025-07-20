import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// 스타일 컴포넌트들
const LoginContainer = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const LoginButton = styled.button`
  background: #fee500;
  border: none;
  border-radius: 6px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  color: #191919;
  cursor: pointer;
  width: 100%;
  margin: 1rem 0;
  transition: all 0.3s ease;
  
  &:hover {
    background: #fdd835;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const LogoutButton = styled.button`
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  margin-top: 1rem;
  
  &:hover {
    background: #eee;
  }
`;

const UserProfile = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1rem 0;
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 1rem;
  border: 2px solid #fee500;
`;

const UserName = styled.h3`
  margin: 0.5rem 0;
  color: #333;
  font-size: 1.2rem;
`;

const UserEmail = styled.p`
  margin: 0.5rem 0;
  color: #666;
  font-size: 0.9rem;
`;

const ErrorMessage = styled.div`
  background: #ffebee;
  color: #c62828;
  padding: 1rem;
  border-radius: 6px;
  margin: 1rem 0;
  font-size: 0.9rem;
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #fee500;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const KakaoLogin = () => {
  const [isKakaoReady, setIsKakaoReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 카카오 SDK 초기화
  useEffect(() => {
    const initKakao = () => {
      try {
        // 카카오 SDK가 이미 로드되어 있는지 확인
        if (window.Kakao) {
          const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;
          
          if (!kakaoKey) {
            setError('카카오 JavaScript 키가 설정되지 않았습니다.');
            return;
          }

          // 이미 초기화되어 있다면 재초기화하지 않음
          if (!window.Kakao.isInitialized()) {
            window.Kakao.init(kakaoKey);
            console.log('Kakao SDK 초기화 완료');
          }
          
          setIsKakaoReady(true);
          checkLoginStatus();
        } else {
          setError('카카오 SDK를 로드할 수 없습니다.');
        }
      } catch (err) {
        console.error('카카오 SDK 초기화 오류:', err);
        setError('카카오 SDK 초기화에 실패했습니다.');
      }
    };

    // 카카오 SDK 스크립트 동적 로드
    if (!window.Kakao) {
      const script = document.createElement('script');
      script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
      script.async = true;
      script.onload = initKakao;
      script.onerror = () => {
        setError('카카오 SDK 스크립트 로드에 실패했습니다.');
      };
      document.head.appendChild(script);
    } else {
      initKakao();
    }
  }, []);

  // 로그인 상태 확인
  const checkLoginStatus = () => {
    try {
      if (window.Kakao?.Auth) {
        const token = window.Kakao.Auth.getAccessToken();
        if (token) {
          setIsLoggedIn(true);
          getUserInfo();
        }
      }
    } catch (err) {
      console.error('로그인 상태 확인 오류:', err);
    }
  };

  // 카카오 로그인
  const handleLogin = () => {
    if (!isKakaoReady) {
      setError('카카오 SDK가 준비되지 않았습니다.');
      return;
    }

    setLoading(true);
    setError('');

    window.Kakao.Auth.login({
      success: (response) => {
        console.log('로그인 성공:', response);
        setIsLoggedIn(true);
        getUserInfo();
      },
      fail: (error) => {
        console.error('로그인 실패:', error);
        setError('로그인에 실패했습니다. 다시 시도해주세요.');
        setLoading(false);
      }
    });
  };

  // 사용자 정보 가져오기 (/v2/user/me)
  const getUserInfo = () => {
    setLoading(true);
    
    window.Kakao.API.request({
      url: '/v2/user/me',
      success: (response) => {
        console.log('사용자 정보:', response);
        setUserInfo(response);
        setLoading(false);
      },
      fail: (error) => {
        console.error('사용자 정보 가져오기 실패:', error);
        setError('사용자 정보를 가져오는데 실패했습니다.');
        setLoading(false);
      }
    });
  };

  // 로그아웃
  const handleLogout = () => {
    if (!window.Kakao?.Auth) {
      return;
    }

    window.Kakao.Auth.logout(() => {
      console.log('로그아웃 완료');
      setIsLoggedIn(false);
      setUserInfo(null);
      setError('');
    });
  };

  return (
    <LoginContainer>
      <h2>카카오 로그인</h2>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      {!isKakaoReady ? (
        <div>
          <LoadingSpinner />
          <p>카카오 SDK 로딩 중...</p>
        </div>
      ) : !isLoggedIn ? (
        <div>
          <p>카카오 계정으로 간편하게 로그인하세요</p>
          <LoginButton onClick={handleLogin} disabled={loading}>
            {loading ? (
              <>
                <LoadingSpinner /> 로그인 중...
              </>
            ) : (
              '카카오 로그인'
            )}
          </LoginButton>
        </div>
      ) : (
        <div>
          {loading ? (
            <div>
              <LoadingSpinner />
              <p>사용자 정보 로딩 중...</p>
            </div>
          ) : userInfo ? (
            <UserProfile>
              <h3>로그인 성공!</h3>
              {userInfo.properties?.profile_image && (
                <ProfileImage 
                  src={userInfo.properties.profile_image} 
                  alt="프로필 이미지" 
                />
              )}
              <UserName>
                {userInfo.properties?.nickname || '이름 없음'}
              </UserName>
              <UserEmail>
                ID: {userInfo.id}
              </UserEmail>
              {userInfo.kakao_account?.email && (
                <UserEmail>
                  이메일: {userInfo.kakao_account.email}
                </UserEmail>
              )}
              <LogoutButton onClick={handleLogout}>
                로그아웃
              </LogoutButton>
            </UserProfile>
          ) : (
            <div>사용자 정보를 불러올 수 없습니다.</div>
          )}
        </div>
      )}
    </LoginContainer>
  );
};

export default KakaoLogin; 