'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './wedding-edit.module.css';

export default function WeddingEdit() {
  const router = useRouter();
  const [audioList, setAudioList] = useState([
    { id: 1, file: null, youtubeUrl: '', category: '', requirements: '' }
  ]);
  const [contactInfo, setContactInfo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [orderInfo, setOrderInfo] = useState(null);
  
  const basePrice = 10000; // 기본 가격 1만원
  const additionalPrice = 10000; // 추가 음원당 1만원
  const totalPrice = basePrice + (audioList.length - 1) * additionalPrice;

  const addAudioTrack = () => {
    const newId = Math.max(...audioList.map(audio => audio.id)) + 1;
    setAudioList([...audioList, {
      id: newId,
      file: null,
      youtubeUrl: '',
      category: '',
      requirements: ''
    }]);
  };

  const removeAudioTrack = (id) => {
    if (audioList.length > 1) {
      setAudioList(audioList.filter(audio => audio.id !== id));
    }
  };

  const handleAudioChange = (id, field, value) => {
    setAudioList(audioList.map(audio => 
      audio.id === id ? { ...audio, [field]: value } : audio
    ));
  };

  const handleFileChange = (id, files) => {
    if (files && files[0]) {
      handleAudioChange(id, 'file', files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 폼 검증
    const hasValidAudio = audioList.some(audio => 
      audio.file || audio.youtubeUrl || audio.category
    );
    
    if (!hasValidAudio) {
      alert('최소 1개의 음원 정보를 입력해주세요.');
      setIsSubmitting(false);
      return;
    }
    
    if (!contactInfo) {
      alert('연락처를 입력해주세요.');
      setIsSubmitting(false);
      return;
    }

    // 주문 처리 시뮬레이션
    setTimeout(() => {
      // 입금자명을 위한 연락처 마지막 4자리 추출
      const contactLast4 = contactInfo.replace(/[^0-9]/g, '').slice(-4);
      
      // 주문 정보 저장
      const orderData = {
        contactLast4,
        totalPrice,
        audioCount: audioList.length,
        contactInfo,
        audioList
      };
      
      setOrderInfo(orderData);
      setIsSubmitting(false);
      setShowModal(true);
    }, 2000);
  };

  // 카카오톡 공유 함수
  const shareToKakao = async () => {
    if (!orderInfo) return;
    
    const orderMessage = `🎵 셀프노트스튜디오 - 웨딩 음원 편집 주문 완료

💳 입금 계좌 정보
○○은행 123-456-789012
예금주: 셀프노트스튜디오

💰 입금 금액: ${orderInfo.totalPrice.toLocaleString()}원
📝 입금자명: ${orderInfo.contactLast4} (연락처 뒤 4자리)

📋 주문 정보
🎧 편집 음원: ${orderInfo.audioCount}개
📱 연락처: ${orderInfo.contactInfo}

⏰ 입금 확인 후 24시간 내에 연락드리겠습니다.
📞 문의: 02-1234-5678

※ 이 메시지를 카카오톡으로 전달해주세요`;

    try {
      // 클립보드에 복사
      await navigator.clipboard.writeText(orderMessage);
      
      // 카카오톡 앱 실행 시도
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      if (isMobile) {
        // 모바일에서 카카오톡 앱 열기
        window.location.href = 'kakaotalk://';
        setTimeout(() => {
          alert('📋 주문 정보가 복사되었습니다!\n카카오톡에서 붙여넣기(Ctrl+V)하여 전달하세요.');
        }, 1000);
      } else {
        // PC에서 카카오톡 웹 열기
        window.open('https://web.kakao.com/', '_blank');
        alert('📋 주문 정보가 복사되었습니다!\n카카오톡에서 붙여넣기(Ctrl+V)하여 전달하세요.');
      }
    } catch (err) {
      // 클립보드 복사 실패 시 텍스트 영역으로 대체
      const textArea = document.createElement('textarea');
      textArea.value = orderMessage;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('📋 주문 정보가 복사되었습니다!\n카카오톡에서 붙여넣기하여 전달하세요.');
    }
  };

  // 모달 닫기
  const closeModal = () => {
    setShowModal(false);
    setOrderInfo(null);
  };

  // 주문 완료 처리
  const completeOrder = () => {
    // 폼 초기화
    setAudioList([{ id: 1, file: null, youtubeUrl: '', category: '', requirements: '' }]);
    setContactInfo('');
    // 파일 input들 초기화
    document.querySelectorAll('input[type="file"]').forEach(input => input.value = '');
    closeModal();
  };

  return (
    <main className={styles.weddingEditPage}>
      {/* Hero 섹션 */}
      <section className={styles.weddingHero}>
        <div className={styles.weddingHeroContainer}>
          <div className={styles.weddingHeroContent}>
            <div className={styles.weddingHeroText}>
              <div className={styles.badge}>Wedding Audio</div>
              <h1 className={styles.weddingTitle}>
                <span className="jalnan">결혼식 음원 편집</span>
              </h1>
              <p className={styles.weddingSubtitle}>
                소중한 순간을 위한 완벽한 사운드를 만들어드립니다
              </p>
              <div className={styles.weddingFeatures}>
                <div className={styles.weddingFeature}>
                  <div className={styles.featureIcon}>
                    <div className={styles.iconCircle}></div>
                  </div>
                  <span>프로페셔널 편집</span>
                </div>
                <div className={styles.weddingFeature}>
                  <div className={styles.featureIcon}>
                    <div className={styles.iconSquare}></div>
                  </div>
                  <span>24시간 내 완성</span>
                </div>
                <div className={styles.weddingFeature}>
                  <div className={styles.featureIcon}>
                    <div className={styles.iconTriangle}></div>
                  </div>
                  <span>하이파이 음질</span>
                </div>
              </div>
            </div>
            <div className={styles.weddingHeroImage}>
              <div className={styles.weddingImagePlaceholder}>
                <div className={styles.waveAnimation}>
                  <div className={styles.wave}></div>
                  <div className={styles.wave}></div>
                  <div className={styles.wave}></div>
                  <div className={styles.wave}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 서비스 소개 섹션 */}
      <section className={styles.weddingServiceSection}>
        <div className={styles.weddingServiceContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.weddingServiceTitle}>
              <span className="jalnan">편집 진행 과정</span>
            </h2>
            <p className={styles.weddingServiceDesc}>
              전문가와 함께하는 4단계 음원 편집 프로세스
            </p>
          </div>
          <div className={styles.weddingServiceGrid}>
            <div className={styles.weddingServiceCard}>
              <div className={styles.processFlow}>
                <div className={styles.serviceNumber}>01</div>
                <div className={styles.processArrow}>→</div>
              </div>
              <h3>상담 & 분석</h3>
              <p>음원 분석 후 최적의 편집 방향을 제안하고 세부 요구사항을 확정합니다</p>
              <div className={styles.processTime}>소요시간: 1-2시간</div>
            </div>
            <div className={styles.weddingServiceCard}>
              <div className={styles.processFlow}>
                <div className={styles.serviceNumber}>02</div>
                <div className={styles.processArrow}>→</div>
              </div>
              <h3>편집 & 믹싱</h3>
              <p>전문 장비로 음질 향상, 타이밍 조정, 페이드 효과 등 정밀 편집 작업을 진행합니다</p>
              <div className={styles.processTime}>소요시간: 4-6시간</div>
            </div>
            <div className={styles.weddingServiceCard}>
              <div className={styles.processFlow}>
                <div className={styles.serviceNumber}>03</div>
                <div className={styles.processArrow}>→</div>
              </div>
              <h3>검토 & 수정</h3>
              <p>1차 결과물을 전달하고 피드백을 받아 완벽할 때까지 수정 작업을 진행합니다</p>
              <div className={styles.processTime}>소요시간: 2-4시간</div>
            </div>
            <div className={styles.weddingServiceCard}>
              <div className={styles.processFlow}>
                <div className={styles.serviceNumber}>04</div>
                <div className={styles.processComplete}>✓</div>
              </div>
              <h3>완성 & 전달</h3>
              <p>고품질 음원 파일과 백업 파일을 포함한 완성본을 안전하게 전달드립니다</p>
              <div className={styles.processTime}>즉시 전달</div>
            </div>
          </div>
          
          {/* 편집 유형 섹션 추가 */}
          <div className={styles.editTypesSection}>
            <h3 className={styles.editTypesTitle}>편집 가능한 음원 유형</h3>
            <div className={styles.editTypesGrid}>
              <div className={styles.editTypeCard}>
                <div className={styles.editTypeIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18V5l12-2v13" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <span>입장곡</span>
              </div>
              <div className={styles.editTypeCard}>
                <div className={styles.editTypeIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="currentColor" strokeWidth="2"/>
                    <line x1="12" y1="19" x2="12" y2="23" stroke="currentColor" strokeWidth="2"/>
                    <line x1="8" y1="23" x2="16" y2="23" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <span>축가</span>
              </div>
              <div className={styles.editTypeCard}>
                <div className={styles.editTypeIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <span>행진곡</span>
              </div>
              <div className={styles.editTypeCard}>
                <div className={styles.editTypeIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <span>BGM</span>
              </div>
              <div className={styles.editTypeCard}>
                <div className={styles.editTypeIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <polygon points="10,8 16,12 10,16" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <span>동영상 음원</span>
              </div>
              <div className={styles.editTypeCard}>
                <div className={styles.editTypeIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="2"/>
                    <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <span>맞춤 편집</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 업로드 폼 섹션 */}
      <section className={styles.weddingFormSection}>
        <div className={styles.weddingFormContainer}>
          <div className={styles.formHeader}>
            <h2 className={styles.weddingFormTitle}>
              <span className="jalnan">편집 요청 & 결제</span>
            </h2>
            <p className={styles.weddingFormDesc}>
              음원 정보를 입력하고 바로 결제하여 편집을 시작하세요
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className={styles.weddingForm}>
            {/* 음원 리스트 */}
            <div className={styles.audioListSection}>
              <div className={styles.audioListHeader}>
                <h3>편집할 음원 목록</h3>
              </div>

              {audioList.map((audio, index) => (
                <div key={audio.id} className={styles.audioItem}>
                  <div className={styles.audioItemHeader}>
                    <span className={styles.audioNumber}>음원 {index + 1}</span>
                    {audioList.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeAudioTrack(audio.id)}
                        className={styles.removeAudioButton}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2"/>
                          <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* 파일 업로드 */}
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>음원 파일</label>
                    <div className={styles.fileUploadArea}>
                      <input
                        type="file"
                        accept="audio/*"
                        onChange={(e) => handleFileChange(audio.id, e.target.files)}
                        className={styles.fileInput}
                        id={`audioFile-${audio.id}`}
                      />
                      <label htmlFor={`audioFile-${audio.id}`} className={styles.fileUploadLabel}>
                        <div className={styles.uploadIcon}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2"/>
                            <polyline points="17,8 12,3 7,8" stroke="currentColor" strokeWidth="2"/>
                            <line x1="12" y1="3" x2="12" y2="15" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                        </div>
                        <div className={styles.uploadText}>
                          {audio.file ? audio.file.name : '파일을 선택하거나 드래그하세요'}
                        </div>
                        <div className={styles.uploadHint}>MP3, WAV, FLAC 등 모든 음원 포맷 지원</div>
                      </label>
                    </div>
                  </div>

                  {/* OR 구분선 */}
                  <div className={styles.formDivider}>
                    <span>OR</span>
                  </div>

                  {/* YouTube URL */}
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>YouTube URL</label>
                    <input
                      type="url"
                      value={audio.youtubeUrl}
                      onChange={(e) => handleAudioChange(audio.id, 'youtubeUrl', e.target.value)}
                      placeholder="https://youtube.com/watch?v=..."
                      className={styles.formInput}
                    />
                  </div>

                  <div className={styles.formRow}>
                    {/* 카테고리 */}
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>
                        카테고리 <span className={styles.required}>*</span>
                      </label>
                      <select
                        value={audio.category}
                        onChange={(e) => handleAudioChange(audio.id, 'category', e.target.value)}
                        className={styles.formSelect}
                        required
                      >
                        <option value="">선택하세요</option>
                        <option value="entrance">입장곡</option>
                        <option value="congratulations">축가</option>
                        <option value="march">행진곡</option>
                        <option value="bgm">BGM</option>
                        <option value="video">동영상 음원</option>
                        <option value="other">기타</option>
                      </select>
                    </div>
                  </div>

                  {/* 요청사항 */}
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>편집 요청사항</label>
                    <textarea
                      value={audio.requirements}
                      onChange={(e) => handleAudioChange(audio.id, 'requirements', e.target.value)}
                      placeholder="이 음원의 구체적인 편집 요청사항을 입력하세요&#10;예: 1분 30초로 편집, 페이드 효과, 특정 구간 강조 등"
                      className={styles.formTextarea}
                      rows="3"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* 연락처 */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                연락처 <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                placeholder="이메일 또는 카카오톡 ID"
                className={styles.formInput}
                required
              />
            </div>

            {/* 음원 추가 버튼 */}
            <div className={styles.addAudioSection}>
              <button
                type="button"
                onClick={addAudioTrack}
                className={styles.addAudioButton}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" strokeWidth="2"/>
                  <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2"/>
                </svg>
                음원 추가 (+{additionalPrice.toLocaleString()}원)
              </button>
            </div>

            {/* 결제 버튼 */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.paymentButton}
            >
              {isSubmitting ? (
                <div className={styles.loadingSpinner}></div>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2"/>
                    <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3" stroke="currentColor" strokeWidth="2"/>
                    <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  {totalPrice.toLocaleString()}원 주문 완료하기
                </>
              )}
            </button>
          </form>

          {/* 추가 정보 */}
          <div className={styles.weddingInfo}>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h4>빠른 상담</h4>
              <p>02-1234-5678</p>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h4>작업 시간</h4>
              <p>1-2일 완성</p>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2"/>
                  <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3" stroke="currentColor" strokeWidth="2"/>
                  <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h4>품질 보장</h4>
              <p>무료 수정 2회</p>
            </div>
          </div>
        </div>
      </section>

      {/* 뒤로가기 버튼 */}
      <div className={styles.backButtonContainer}>
        <button 
          onClick={() => router.push('/')} 
          className={styles.backButton}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2"/>
          </svg>
          메인으로 돌아가기
        </button>
      </div>

      {/* 주문 완료 모달 */}
      {showModal && orderInfo && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            {/* 모달 헤더 */}
            <div className={styles.modalHeader}>
              <h2>🎉 주문이 완료되었습니다!</h2>
              <button onClick={closeModal} className={styles.modalCloseButton}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2"/>
                  <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
            </div>

            {/* 계좌 정보 */}
            <div className={styles.bankInfo}>
              <h3>💳 입금 계좌 정보</h3>
              <div className={styles.bankDetails}>
                <div className={styles.bankRow}>
                  <span className={styles.bankLabel}>은행</span>
                  <span className={styles.bankValue}>○○은행</span>
                </div>
                <div className={styles.bankRow}>
                  <span className={styles.bankLabel}>계좌번호</span>
                  <span className={styles.bankValue}>123-456-789012</span>
                </div>
                <div className={styles.bankRow}>
                  <span className={styles.bankLabel}>예금주</span>
                  <span className={styles.bankValue}>셀프노트스튜디오</span>
                </div>
                <div className={styles.bankRow}>
                  <span className={styles.bankLabel}>입금 금액</span>
                  <span className={styles.bankValueHighlight}>{orderInfo.totalPrice.toLocaleString()}원</span>
                </div>
                <div className={styles.bankRow}>
                  <span className={styles.bankLabel}>입금자명</span>
                  <span className={styles.bankValueHighlight}>{orderInfo.contactLast4}</span>
                </div>
              </div>
            </div>

            {/* 주문 정보 */}
            <div className={styles.orderSummary}>
              <h3>📋 주문 정보</h3>
              <div className={styles.orderDetails}>
                <div className={styles.orderRow}>
                  <span>🎧 편집 음원</span>
                  <span>{orderInfo.audioCount}개</span>
                </div>
                <div className={styles.orderRow}>
                  <span>📱 연락처</span>
                  <span>{orderInfo.contactInfo}</span>
                </div>
              </div>
            </div>

            {/* 안내 사항 */}
            <div className={styles.noticeInfo}>
              <p>⏰ 입금 확인 후 24시간 내에 연락드리겠습니다.</p>
              <p>📞 문의: 02-1234-5678</p>
            </div>

            {/* 모달 버튼들 */}
            <div className={styles.modalButtons}>
              <button onClick={shareToKakao} className={styles.kakaoButton}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 5.64 2 10.05c0 2.82 1.91 5.3 4.72 6.74L5.5 22l5.42-2.87c.36.03.72.05 1.08.05 5.52 0 10-3.64 10-8.18S17.52 2 12 2z" fill="currentColor"/>
                </svg>
                카카오톡으로 전달하기
              </button>
              <button onClick={completeOrder} className={styles.completeButton}>
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
} 