import React, {useEffect} from "react";
import {ChakraProvider, Heading, Box, Text, Button, extendTheme, Stack} from '@chakra-ui/react'

type Props = {

}

function Lobby(props: Props) {
    return (
        <ChakraProvider resetCSS>
            <Box p={20} textAlign="left">
                <Heading>Manhunt on Wikipedia</Heading>
                <Heading fontSize="8xl" lineHeight={1} mb={3}>
                    Wikichase
                </Heading>
                <Stack spacing={0} ml={1} textAlign="justify">
                    <Text fontSize="3xl" >
                        Hop around pages <Text as={'b'}>by clicking links. 👆</Text>
                        <br/>
                        If you are <Text as={'b'}>Hunter 👮</Text>, aim to <Text as={'b'}>catch the runner</Text>. Reach the page where the runner is, and you win.
                        <br/>
                        If you are <Text as={'b'}>Runner 🏃</Text>, aim to <Text as={'b'}>reach the designated goal page</Text>.  Get to the goal before getting caught, and you win.
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
                >
                    <Text as='u'>Ready? Click Here to Start.</Text>
                </Button>
            </Box>
        </ChakraProvider>
    )
}

export default Lobby;