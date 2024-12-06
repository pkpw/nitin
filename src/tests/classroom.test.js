import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getAllClassrooms, createClassroom, deleteClassroom } from '$lib/server/models/classroom';

const mockSupabaseClient = {
    from: (table) => {
      if (table === 'classrooms') {
        return {
          select: () => ({
            data: [{ id: 1, name: 'Test Classroom' }],
            error: null,
          }),
          insert: (data) => {
            if (data.name === 'Existing Classroom') {
              return { data: null, error: { message: 'Classroom already exists.' } };
            }
            return { data: [{ id: 2, name: data.name }], error: null };
          },
          delete: () => ({
            eq: (id) => {
              if (id === 999) {
                // Simulate error for non-existent classroom
                return { data: null, error: { message: 'Classroom not found.' } };
              }
              // Successful deletion
              return { data: [{ id: 1, name: 'Test Classroom' }], error: null };
            }
          })
        };
      }
      return { select: () => ({ data: [], error: null }) };
    }
  };

// Mocking the Supabase Client Getter
vi.mock('$lib/server/supabase-client', () => ({
  getSupabaseClient: () => mockSupabaseClient,
}));

describe('Classroom Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Test fetching all classrooms
  it('should fetch all classrooms', async () => {
    const result = await getAllClassrooms(mockSupabaseClient);
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('error');
    expect(result.data).toEqual([{ id: 1, name: 'Test Classroom' }]);
  });

  // Test creating a classroom
  it('should create a classroom successfully', async () => {
    const newClassroom = { name: 'New Classroom' };
    const result = await createClassroom(newClassroom.name, mockSupabaseClient);
    expect(result).toHaveProperty('data');
    expect(result.data).toEqual([{ id: 2, name: 'New Classroom' }]);
    expect(result).toHaveProperty('error');
    expect(result.error).toBeNull();
  });

// Test for deleting a classroom
  it('should delete a classroom successfully', async () => {
    const result = await deleteClassroom(1, mockSupabaseClient);
    expect(result).toHaveProperty('error');
    expect(result.error).toBeNull();
  });

  // New Test: Handling error when creating a classroom with an existing name
  it('should return an error if classroom already exists', async () => {
    const result = await createClassroom('Existing Classroom', mockSupabaseClient);
    expect(result).toHaveProperty('data');
    expect(result.data).toBeNull();
    expect(result).toHaveProperty('error');
    expect(result.error).toEqual({ message: 'Classroom already exists.' });
  });
});

// Test for deleting a non-existent classroom
it('should fail to delete a non-existent classroom', async () => {
    const result = await deleteClassroom(999, mockSupabaseClient); // Non-existent classroom ID
    expect(result).toHaveProperty('error');
    expect(result.error);
  });