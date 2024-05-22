import { AppLayout } from '@/Layouts/AppLayout.jsx'
import {
  Box,
  Button,
  Center,
  Image,
  PasswordInput,
  SimpleGrid,
  TextInput,
  Title,
} from '@mantine/core'
import { IconMail, IconOlympics, IconPassword } from '@tabler/icons-react'
import { useForm } from '@inertiajs/react'

const Login = (props) => {
  const form = useForm({
    email: '',
    password: '',
  })
  
  console.log(props)
  
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
            src="https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          
          <Center>
            <Box w={320}>
              <IconOlympics size={80} />
              
              <Title mb={36}>Masuk Akun</Title>
              
              <TextInput
                leftSection={<IconMail />}
                styles={{
                  label: {
                    marginBottom: 12,
                  },
                  input: {
                    height: 48,
                    borderRadius: 16,
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
                  form.setData('email', e.target.value.toLowerCase())
                  
                  if (!e.target.value) {
                    form.setError({
                      email: 'Alamat surel tidak boleh kosong.',
                    })
                  } else {
                    form.clearErrors('email')
                  }
                }}
                error={form.errors.email}
              />
              
              <PasswordInput
                leftSection={<IconPassword />}
                styles={{
                  label: {
                    marginBottom: 12,
                  },
                  input: {
                    height: 48,
                    borderRadius: 16,
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
                radius={16}
                // c="gold.9"
              >
                Button
              </Button>
            </Box>
          </Center>
        </SimpleGrid>
      </AppLayout>
    </form>
  )
}

export default Login
