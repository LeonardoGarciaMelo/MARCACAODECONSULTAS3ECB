import { User } from '../../../types/auth';
import { Doctor } from '../interfaces/doctors/index';

// Converte User[] para Doctor[]
export const convertUsersToDoctors = (users: User[]): Doctor[] => {
    return users.map(user => ({
      id: user.id,
      name: user.name,
      specialty: user.role === 'doctor' && 'specialty' in user 
        ? user.specialty 
        : 'Especialidade não informada',
      image: user.image
    }));
  };