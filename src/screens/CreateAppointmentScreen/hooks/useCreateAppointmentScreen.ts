import { useAuth } from '../../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { authApiService } from '../../../services/authApi';
import { User } from '../../../types/auth';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';
import { Appointment } from '../interfaces/appointment';
import { Doctor } from '../interfaces/doctors';

type CreateAppointmentScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CreateAppointment'>;
};

export const useCreateAppointmentScreen = () =>{
  const { user } = useAuth();
  const navigation = useNavigation<CreateAppointmentScreenProps['navigation']>();
  const [date, setDate] = useState('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Estados para dados da API
  const [doctors, setDoctors] = useState<User[]>([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);

  // Carrega médicos ao montar o componente
  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      setLoadingDoctors(true);
      setError(''); // Limpa erros anteriores
      const doctorsData = await authApiService.getAllDoctors();
      setDoctors(doctorsData);
      console.log(`${doctorsData.length} médicos carregados com sucesso`);
    } catch (error) {
      console.error('Erro ao carregar médicos:', error);
      setError('Carregando médicos com dados locais...');
      // Tentativa adicional com pequeno delay
      setTimeout(async () => {
        try {
          const doctorsData = await authApiService.getAllDoctors();
          setDoctors(doctorsData);
          setError('');
        } catch (retryError) {
          setError('Médicos carregados com dados locais (API indisponível)');
        }
      }, 1000);
    } finally {
      setLoadingDoctors(false);
    }
  };


  const handleCreateAppointment = async () => {
    try {
      setLoading(true);
      setError('');

      if (!date || !selectedTime || !selectedDoctor) {
        setError('Por favor, preencha a data e selecione um médico e horário');
        return;
      }

      // Recupera consultas existentes
      const storedAppointments = await AsyncStorage.getItem('@MedicalApp:appointments');
      const appointments: Appointment[] = storedAppointments ? JSON.parse(storedAppointments) : [];

      // Cria nova consulta
      const newAppointment: Appointment = {
        id: Date.now().toString(),
        patientId: user?.id || '',
        patientName: user?.name || '',
        doctorId: selectedDoctor.id,
        doctorName: selectedDoctor.name,
        date,
        time: selectedTime,
        specialty: selectedDoctor.specialty,
        status: 'pending',
      };

      // Adiciona nova consulta à lista
      appointments.push(newAppointment);

      // Salva lista atualizada
      await AsyncStorage.setItem('@MedicalApp:appointments', JSON.stringify(appointments));

      alert('Consulta agendada com sucesso!');
      navigation.goBack();
    } catch (err) {
      setError('Erro ao agendar consulta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };
  const handleCancel = () => {
    navigation.goBack();
  }

  return {
    date,
    setDate,
    selectedTime,
    setSelectedTime,
    selectedDoctor,
    setSelectedDoctor,
    doctors,
    loading,
    loadingDoctors,
    error,
    handleCreateAppointment,
    handleCancel
  }
}

