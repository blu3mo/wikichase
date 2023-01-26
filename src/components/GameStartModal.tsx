import {
    Button, ChakraProvider,
    Code,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text, useDisclosure
} from "@chakra-ui/react";
import React from "react";

type Props = {
    gameId: string;
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

function GameStartModal(props: Props) {
    return (
        <ChakraProvider>
            <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader pb={0}>Welcome to the game!</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text fontSize={"lg"}>You are: <Text as={"b"}>Hunter 👮</Text></Text>
                        <Text fontSize={"lg"}>Invite someone to begin the game!</Text>
                        <Text><Text as={"b"}>Option 1:</Text> Share the room code below.</Text>
                        <Code mb={3} fontSize={"3xl"} fontWeight={"bold"} as='kbd'>{props.gameId}</Code>
                        <Text><Text as={"b"}>Option 2:</Text> Share the room URL below.</Text>
                        <Code fontWeight={"bold"} as='kbd'>{window.location.origin}/{props.gameId}/runner</Code>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={props.onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </ChakraProvider>
    )
}

export default GameStartModal