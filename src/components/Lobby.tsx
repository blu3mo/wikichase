import React, {useEffect, useState} from "react";
import { usePlayerMatching } from "../hooks/game/usePlayerMatching";
import {
    ChakraProvider,
    Heading,
    Box,
    Text,
    Button,
    extendTheme,
    Stack,
    Center,
    Modal,
    ModalOverlay, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, ModalContent, useDisclosure, HStack
} from '@chakra-ui/react'

type Props = {
    lang: string
}

function Lobby(props: Props) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const { createGame, joinGame } = usePlayerMatching(props.lang)

    return (
        <ChakraProvider resetCSS>
            <Center>
                <Box p={20} textAlign="left" maxW={1000}>
                    <Heading>Manhunt Game on Wikipedia</Heading>
                    <HStack align={"end"}>
                        <Heading fontSize="8xl" lineHeight={1} mb={3}>
                            Wikichase
                        </Heading>
                        <Text fontSize={"l"} fontWeight={"extrabold"} pb={4}>v0.1</Text>
                    </HStack>
                    <Stack spacing={0} ml={1} textAlign="justify">
                        <Text fontSize="3xl" lineHeight={1.4} fontWeight={"semibold"}>
                            Hop around pages <Text as={'b'}>by clicking links. 👆</Text>
                            <br/>If you are <Text as={'b'}>Hunter 👮</Text>, <Text as={'b'}>catch the runner</Text>.
                            <br/>Reach the page where the runner is, and you win.
                            <br/>If you are <Text as={'b'}>Runner 🏃</Text>, <Text as={'b'}>reach the designated goal page</Text>.
                            <br/>Get to the goal without getting caught, and you win.
                            <br/>
                        </Text>
                    </Stack>
                    <Button
                        variant="unstyled"
                        size="md"
                        fontSize="3xl"
                        pl={0}
                        fontStyle="italic"
                        mt={3}
                        onClick={onOpen}
                        fontWeight={"bold"}
                    >
                        Ready? <Text as='mark'><Text as='u'>Click Here to Play.</Text></Text>
                    </Button>
                </Box>
            </Center>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>

                    <ModalHeader></ModalHeader>
                    <ModalCloseButton />
                    <Stack spacing={3} p={5}>
                        <Button
                            variant="solid"
                            size="md"
                            height={20}
                            fontWeight="bold"
                            fontSize="3xl"
                            onClick={createGame}
                        >
                            ✋ Create a room
                        </Button>
                        <Button
                            variant="solid"
                            size="md"
                            height={20}
                            fontWeight="bold"
                            fontSize="3xl"
                            onClick={joinGame}
                        >
                            🏢 Join a room
                        </Button>
                    </Stack>
                </ModalContent>
            </Modal>
        </ChakraProvider>
    )
}

export default Lobby;