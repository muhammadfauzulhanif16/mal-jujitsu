import { AppLayout } from '@/Layouts/AppLayout.jsx'
import {
  Box,
  Button,
  Center,
  Image,
  SimpleGrid,
  TextInput,
  Title,
} from '@mantine/core'
import { IconMail, IconPassword } from '@tabler/icons-react'
import { useForm } from '@inertiajs/react'

const Login = (props) => {
  const form = useForm({
    email: '',
    password: '',
  })
  
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      form.post(route('login'))
    }}>
      <AppLayout title="Log In" authed={props.auth.user} meta={props.meta}>
        <SimpleGrid
          cols={{
            base: 1,
            xs: 2,
          }}
          w="100%"
          h="100vh"
          p={16}
        >
          <Image
            radius={16}
            h={{
              base: 120,
              xs: '100%',
            }}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/GABRIEL_VELLA_vs_ROMINHO_51.jpg/1024px-GABRIEL_VELLA_vs_ROMINHO_51.jpg"
          />
          
          <Center p={32} style={{
            borderRadius: 20,
          }}>
            <Box w={320}>
              <Image
                radius={80}
                h={80}
                w={80}
                src="https://pbjisurabaya.or.id/images/logo/pbji.png"
              />
              
              <Title mb={36}>Masuk Akun</Title>
              
              <TextInput
                variant="filled"
                leftSection={<IconMail />}
                styles={{
                  label: {
                    marginBottom: 12,
                  },
                  input: {
                    height: 48,
                    borderRadius: 32,
                    paddingLeft: 50,
                    paddingRight: 14,
                  },
                  section: {
                    marginLeft: 8,
                  },
                  error: {
                    marginTop: 12,
                  },
                }}
                label="Alamat Surel"
                placeholder="Masukkan alamat surel..."
                mb={24}
                onChange={(e) => {
                  const email = e.target.value.toLowerCase()
                  form.setData('email', email)
                  
                  if (!email) {
                    form.setError({ email: 'Alamat surel tidak boleh kosong.' })
                  } else if (!/\S+@\S+\.\S+/.test(email)) {
                    form.setError({ email: 'Alamat surel tidak sah.' })
                  } else {
                    form.clearErrors('email')
                  }
                }}
                error={form.errors.email}
              />
              
              <TextInput
                type="password"
                variant="filled"
                leftSection={<IconPassword />}
                styles={{
                  label: {
                    marginBottom: 12,
                  },
                  input: {
                    height: 48,
                    borderRadius: 32,
                    paddingLeft: 60,
                    paddingRight: 14,
                    
                  },
                  section: {
                    marginLeft: 8,
                    marginRight: 8,
                  },
                  innerInput: {
                    marginLeft: 16,
                  },
                  error: {
                    marginTop: 12,
                  },
                }}
                label="Kata Sandi"
                placeholder="Masukkan kata sandi..."
                mb={24}
                onChange={(e) => {
                  form.setData('password', e.target.value)
                  
                  if (!e.target.value) {
                    form.setError({
                      password: 'Kata sandi tidak boleh kosong.',
                    })
                  } else {
                    form.clearErrors('password')
                  }
                }}
                error={form.errors.password}
              />
              
              <Button
                disabled={!form.data.email || !form.data.password || form.hasErrors}
                loading={form.processing}
                variant="filled"
                type="submit"
                color="gold.1"
                h={48}
                fullWidth
                radius={32}
                // c="gold.9"
              >
                Masuk
              </Button>
            </Box>
          </Center>
        </SimpleGrid>
      </AppLayout>
    </form>
  )
}

export default Login
