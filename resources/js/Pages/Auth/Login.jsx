import { AppLayout } from '@/Layouts/AppLayout.jsx'
import { Box, Button, Center, Checkbox, Flex, Image, SimpleGrid, TextInput, Title } from '@mantine/core'
import { IconLock, IconLockOpen, IconMail, IconPassword } from '@tabler/icons-react'
import { useForm } from '@inertiajs/react'

const Login = (props) => {
  const form = useForm({ email: '', password: '', remember: false })
  
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      form.post(route('login'))
    }}>
      <AppLayout title="Log In" authed={props.auth.user} meta={props.meta}>
        <SimpleGrid cols={{ base: 1, xs: 2 }} w="100%" h="100vh" p={16}>
          
          <Flex h={{ base: 120, xs: '100%' }} justify="center">
            <Image fit="contain" src="https://pbjisurabaya.or.id/images/logo/pbji.png" />
          </Flex>
          
          <Center>
            <Box w={320}>
              <Title mb={32}>Masuk Akun</Title>
              
              <TextInput variant="filled" leftSection={<IconMail />} styles={{
                label: { marginBottom: 8 },
                input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 16 },
                section: { marginLeft: 0, width: 48, height: 48 },
                error: { marginTop: 8 },
              }} label="Alamat Surel" placeholder="Masukkan alamat surel..." mb={16} onChange={(e) => {
                const email = e.target.value.toLowerCase()
                form.setData('email', email)
                
                if (!email) {
                  form.setError({ email: 'Alamat surel tidak boleh kosong.' })
                } else if (!/\S+@\S+\.\S+/.test(email)) {
                  form.setError({ email: 'Alamat surel tidak sah.' })
                } else {
                  form.clearErrors('email')
                }
              }} error={form.errors.email} />
              
              <TextInput type="password" variant="filled" leftSection={<IconPassword />} styles={{
                label: { marginBottom: 8 },
                input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 16 },
                section: { marginLeft: 0, width: 48, height: 48 },
                error: { marginTop: 8 },
              }} label="Kata Sandi" placeholder="Masukkan kata sandi..." mb={16} onChange={(e) => {
                form.setData('password', e.target.value)
                
                if (!e.target.value) {
                  form.setError({ password: 'Kata sandi tidak boleh kosong.' })
                } else {
                  form.clearErrors('password')
                }
              }} error={form.errors.password} />
              
              <Checkbox
                variant="filled"
                mb={24}
                styles={{
                  label: { marginLeft: 16, fontSize: 14, padding: 0 },
                  input: { border: 0, backgroundColor: form.data.remember ? 'var(--mantine-color-gold-2)' : '#f1f3f5' },
                }}
                radius={32}
                label="Ingat Saya"
                size="md"
                color="gold.2"
                onChange={(e) => form.setData('remember', e.target.checked)}
              />
              
              <Button px={16} styles={{ section: { marginRight: 16 } }}
                      leftSection={form.hasErrors || form.hasErrors || Object.entries(form.data).some(([key, value]) => key !== 'remember' && !value) ?
                        <IconLock /> : <IconLockOpen />}
                      disabled={form.hasErrors || Object.entries(form.data).some(([key, value]) => key !== 'remember' && !value)} loading={form.processing}
                      variant="filled" type="submit"
                      color="gold.2" h={48} fullWidth radius={32}>
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
