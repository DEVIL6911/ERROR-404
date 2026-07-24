import { useState, useEffect } from 'react';
import axios from 'axios';
import { MOCK_REEFS, MOCK_PAPERS, MOCK_TOPICS } from '../utils/mockData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export function useReefData() {
  const [reefs, setReefs] = useState(MOCK_REEFS);
  const [loading, setLoading] = useState(false);
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  useEffect(() => {
    async function fetchReefs() {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE_URL}/reef`, { timeout: 2500 });
        if (res.data && res.data.length > 0) {
          setReefs(res.data);
          setIsBackendConnected(true);
        }
      } catch (err) {
        console.warn('FastAPI backend offline or unreachable. Utilizing KABOOM! client static dataset.', err.message);
        setReefs(MOCK_REEFS);
        setIsBackendConnected(false);
      } finally {
        setLoading(false);
      }
    }
    fetchReefs();
  }, []);

  return { reefs, loading, isBackendConnected };
}

export function useResearchPapers() {
  const [papers, setPapers] = useState(MOCK_PAPERS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchPapers() {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE_URL}/research`, { timeout: 2500 });
        if (res.data && res.data.length > 0) {
          setPapers(res.data);
        }
      } catch (err) {
        setPapers(MOCK_PAPERS);
      } finally {
        setLoading(false);
      }
    }
    fetchPapers();
  }, []);

  return { papers, loading };
}

export function useForumTopics() {
  const [topics, setTopics] = useState(MOCK_TOPICS);
  const [loading, setLoading] = useState(false);

  const fetchTopics = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/forum/topics`, { timeout: 2500 });
      if (res.data && res.data.length > 0) {
        setTopics(res.data);
      }
    } catch (err) {
      setTopics(MOCK_TOPICS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  const addTopic = async (newTopicData) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/forum/topics`, newTopicData);
      setTopics((prev) => [res.data, ...prev]);
    } catch (err) {
      // Local fallback addition
      const mockNew = {
        id: Date.now(),
        title: newTopicData.title,
        category: newTopicData.category,
        author_name: "Guardian Squad Member",
        author_avatar: "🛡️",
        content: newTopicData.content,
        visual_mode: newTopicData.visual_mode || "SURFACE_OCEAN",
        likes: 0,
        created_at: new Date().toISOString(),
        comments: []
      };
      setTopics((prev) => [mockNew, ...prev]);
    }
  };

  return { topics, loading, refreshTopics: fetchTopics, addTopic };
}
