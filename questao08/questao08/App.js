import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [nome, setNome] = useState('');
  const [matricula, setMatricula] = useState('');
  const [email, setEmail] = useState('');
  const [curso, setCurso] = useState('');
  const [estudantes, setEstudantes] = useState([]);
  const [erro, setErro] = useState('');
  const [mensagem, setMensagem] = useState('');

  function cadastrar() {
    const novo = {
      nome: nome.trim(),
      matricula: matricula.trim(),
      email: email.trim(),
      curso: curso.trim(),
    };

    // Campos obrigatórios
    if (!novo.nome || !novo.matricula || !novo.email || !novo.curso) {
      setMensagem('');
      setErro('Preencha todos os campos: nome, matrícula, e-mail e curso.');
      return;
    }

    // E-mail com formato básico
    if (!/^\S+@\S+\.\S+$/.test(novo.email)) {
      setMensagem('');
      setErro('Informe um e-mail válido. Exemplo: maria@exemplo.com.');
      return;
    }

    // Matrícula duplicada
    if (estudantes.some((e) => e.matricula === novo.matricula)) {
      setMensagem('');
      setErro(`A matrícula ${novo.matricula} já está cadastrada.`);
      return;
    }

    setEstudantes([...estudantes, novo]);
    setErro('');
    setMensagem(`${novo.nome} cadastrado(a) com sucesso.`);
    setNome('');
    setMatricula('');
    setEmail('');
    setCurso('');
  }

  function remover(matriculaRemover) {
    setEstudantes(estudantes.filter((e) => e.matricula !== matriculaRemover));
    setErro('');
    setMensagem('Estudante removido.');
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.titulo}>Cadastro de estudantes</Text>
        <Text style={styles.subtitulo}>Cadastre e consulte os registros.</Text>

        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Maria Silva"
          placeholderTextColor="#9a9a9a"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={[styles.label, styles.espaco]}>Matrícula</Text>
        <TextInput
          style={styles.input}
          placeholder="20260001"
          placeholderTextColor="#9a9a9a"
          keyboardType="number-pad"
          value={matricula}
          onChangeText={setMatricula}
        />

        <Text style={[styles.label, styles.espaco]}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="maria@exemplo.com"
          placeholderTextColor="#9a9a9a"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={[styles.label, styles.espaco]}>Curso</Text>
        <TextInput
          style={styles.input}
          placeholder="Licenciatura em Computação"
          placeholderTextColor="#9a9a9a"
          value={curso}
          onChangeText={setCurso}
        />

        {erro !== '' && <Text style={styles.erro}>{erro}</Text>}
        {mensagem !== '' && <Text style={styles.sucesso}>{mensagem}</Text>}

        <Pressable
          style={({ pressed }) => [styles.botao, pressed && styles.pressionado]}
          onPress={cadastrar}
        >
          <Text style={styles.botaoTexto}>Cadastrar estudante</Text>
        </Pressable>

        <Text style={styles.secao}>Estudantes cadastrados ({estudantes.length})</Text>

        {estudantes.length === 0 && (
          <Text style={styles.vazio}>
            Nenhum estudante cadastrado. Preencha o formulário acima para começar.
          </Text>
        )}

        {estudantes.map((e) => (
          <View key={e.matricula} style={styles.card}>
            <Text style={styles.cardNome}>{e.nome}</Text>
            <Text style={styles.cardLinha}>Matrícula: {e.matricula}</Text>
            <Text style={styles.cardLinha}>E-mail: {e.email}</Text>
            <Text style={styles.cardLinha}>Curso: {e.curso}</Text>
            <Pressable
              style={({ pressed }) => [styles.botaoRemover, pressed && styles.pressionado]}
              onPress={() => remover(e.matricula)}
            >
              <Text style={styles.botaoRemoverTexto}>Remover</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#f1f6f3' },
  container: { padding: 24, paddingTop: 56, paddingBottom: 48 },
  titulo: { fontSize: 28, fontWeight: '700', color: '#17352a' },
  subtitulo: { fontSize: 15, color: '#55756a', marginTop: 4, marginBottom: 24 },
  label: { fontSize: 15, fontWeight: '600', color: '#17352a', marginBottom: 6 },
  espaco: { marginTop: 14 },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#cfe0d7',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 17,
    color: '#17352a',
  },
  erro: { color: '#b3261e', marginTop: 12, fontSize: 14 },
  sucesso: { color: '#2e7d4f', marginTop: 12, fontSize: 14 },
  botao: {
    backgroundColor: '#1f7a55',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  pressionado: { opacity: 0.8 },
  botaoTexto: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
  secao: { fontSize: 20, fontWeight: '700', color: '#17352a', marginTop: 32, marginBottom: 12 },
  vazio: { fontSize: 15, color: '#55756a' },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#cfe0d7',
  },
  cardNome: { fontSize: 18, fontWeight: '700', color: '#17352a', marginBottom: 6 },
  cardLinha: { fontSize: 15, color: '#3d5c50', marginTop: 2 },
  botaoRemover: {
    alignSelf: 'flex-start',
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#b3261e',
  },
  botaoRemoverTexto: { color: '#b3261e', fontSize: 14, fontWeight: '600' },
});