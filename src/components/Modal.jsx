import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  Modal as ChakraModal, // Renomeando o Modal do Chakra UI para evitar conflito
} from "@chakra-ui/react";

import { useState } from "react";

const Modal = ({ data, setData, dataEdit, isOpen, onClose }) => {
  const [name, setName] = useState(dataEdit.name || "");
  const [email, setEmail] = useState(dataEdit.email || "");

  const emailAlreadyExist = () => {
    return data.some((item) => item.email === email);
  };

  const handleSave = () => {
    if (!name || !email) return;

    if (emailAlreadyExist()) {
      return alert("Email já cadastrado!");
    }

    // Verifica se está editando
    if (Object.keys(dataEdit).length) {
      data[dataEdit.index] = { name, email };
    }

    // Adiciona um novo cadastro se não estiver editando
    const newDataArray = !Object.keys(dataEdit).length
      ? [...(data ? data : []), { name, email }]
      : [...(data ? data : [])];

    localStorage.setItem("cad_cliente", JSON.stringify(newDataArray));
    setData(newDataArray);

    onClose();
  };

  return (
    <ChakraModal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Cadastro de clientes</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl display="flex" flexDir="column" gap={4}>
            <Box>
              <FormLabel>Nome</FormLabel>
              <Input
                placeholder="Digite seu nome"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Digite seu email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="green" mr={3} onClick={handleSave}>
            Salvar
          </Button>
          <Button colorScheme="red" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
