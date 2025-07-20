import React, { useState } from 'react';

export default function ConsultationForm() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    people: '',
    service: '',
    message: '',
    youtubeUrl: '',
    videoTitle: ''
  });
  const [loading, setLoading] = useState(false);

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Next.js API 라우트 사용
      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          timestamp: new Date().toISOString()
        })
      });
      
      const data = await res.json();
      
      if (data.success) {
        alert('상담 신청이 접수되었습니다! 빠른 시일 내에 연락드리겠습니다.');
        setForm({
          name: '',
          phone: '',
          people: '',
          service: '',
          message: '',
          youtubeUrl: '',
          videoTitle: ''
        });
      } else {
        alert(data.message || '상담 신청에 실패했습니다.');
      }
    } catch (err) {
      console.error('상담 신청 오류:', err);
      alert('서버 연결에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <input 
        name="name" 
        placeholder="이름" 
        value={form.name} 
        onChange={handleChange} 
        required 
        style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}
      />
      <input 
        name="phone" 
        placeholder="연락처 (예: 010-1234-5678)" 
        value={form.phone} 
        onChange={handleChange} 
        required 
        style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}
      />
      <input 
        name="people" 
        placeholder="사용 인원 (예: 2명)" 
        value={form.people} 
        onChange={handleChange} 
        required 
        style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}
      />
      <input 
        name="service" 
        placeholder="이용 목적 (예: 보컬 녹음, 악기 녹음)" 
        value={form.service} 
        onChange={handleChange} 
        required 
        style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}
      />
      <textarea 
        name="message" 
        placeholder="상담 내용 (선택사항)" 
        value={form.message} 
        onChange={handleChange} 
        rows="3"
        style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px', resize: 'vertical' }}
      />
      <input 
        name="youtubeUrl" 
        placeholder="유튜브 링크 (선택사항)" 
        value={form.youtubeUrl} 
        onChange={handleChange} 
        style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}
      />
      <input 
        name="videoTitle" 
        placeholder="곡 제목 (선택사항)" 
        value={form.videoTitle} 
        onChange={handleChange} 
        style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}
      />
      <button 
        type="submit" 
        disabled={loading} 
        style={{ 
          padding: '14px 0', 
          background: '#3491FF', 
          color: '#fff', 
          border: 'none', 
          borderRadius: '4px', 
          fontWeight: '600',
          fontSize: '16px',
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.7 : 1
        }}
      >
        {loading ? '전송 중...' : '상담 신청하기'}
      </button>
    </form>
  );
} 