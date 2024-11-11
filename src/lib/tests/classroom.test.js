// src/lib/tests/classroom.test.js
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getAllClassrooms, createClassroom } from '../classroom';

// Mock Supabase Clients
vi.mock('../supabase-client', () => ({
  getSupabaseClient: () => ({
    from: (table) => {
      if (table === 'classrooms') {
        return {
          select: () => ({
            data: [{ id: 1, name: 'Test Classroom' }],
            error: null,
          }),
          insert: (data) => ({
            data: [{ id: 2, name: data.name }],
            error: null,
          })
        };
      }
      return { select: () => ({ data: [], error: null }) };
    },
  }),
}));

describe('Classroom Functions', () => {
    beforeEach(() => {
      vi.clearAllMocks(); // Reset mocks before each test
    });
  
    // Test fetching all classrooms
    it('should fetch all classrooms', async () => {
      const result = await getAllClassrooms();
      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('error');
      expect(result.data).toEqual([{ id: 1, name: 'Test Classroom' }]);
    });
  
    // Test creating a classroom
    it('should create a classroom successfully', async () => {
      const newClassroom = { name: 'New Classroom' };
      const result = await createClassroom(newClassroom.name);
      expect(result).toHaveProperty('data');
      expect(result.data).toEqual([{ id: 2, name: 'New Classroom' }]);
      expect(result).toHaveProperty('error');
      expect(result.error).toBeNull();
    });
  });