import React from 'react';
import { ScrollView, ViewStyle } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Header from '../../components/Header';
import DoctorList from '../../components/DoctorList';
import TimeSlotList from '../../components/TimeSlotList';
import {styles,Container, Title, SectionTitle,ErrorText} from './styles'
import {convertUsersToDoctors} from './utils/userUtils'
import { useCreateAppointmentScreen } from './hooks/useCreateAppointmentScreen';
// Médicos agora vêm da API através do AppointmentForm

const CreateAppointmentScreen: React.FC = () => {
  const {
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
  } = useCreateAppointmentScreen();

  return (
    <Container>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Title>Agendar Consulta</Title>

        <Input
          placeholder="Data (DD/MM/AAAA)"
          value={date}
          onChangeText={setDate}
          containerStyle={styles.input}
          keyboardType="numeric"
        />

        <SectionTitle>Selecione um Horário</SectionTitle>
        <TimeSlotList
          onSelectTime={setSelectedTime}
          selectedTime={selectedTime}
        />

        <SectionTitle>Selecione um Médico</SectionTitle>
        {loadingDoctors ? (
          <ErrorText>Carregando médicos...</ErrorText>
        ) : (
          <DoctorList
            doctors={convertUsersToDoctors(doctors)}
            onSelectDoctor={setSelectedDoctor}
            selectedDoctorId={selectedDoctor?.id}
          />
        )}

        {error ? <ErrorText>{error}</ErrorText> : null}

        <Button
          title="Agendar"
          onPress={handleCreateAppointment}
          loading={loading}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.buttonStyle}
        />

        <Button
          title="Cancelar"
          onPress={() => handleCancel()}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.cancelButton}
        />
      </ScrollView>
    </Container>
  );
};


export default CreateAppointmentScreen;
