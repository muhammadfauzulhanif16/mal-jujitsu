import { AppLayout } from '@/Layouts/AppLayout.jsx'
import { Center, Divider, Title } from '@mantine/core'
import { Breadcrumbs } from '@/Components/Breadcrumbs.jsx'

const Dashboard = (props) => {
  return (
    <AppLayout title="Beranda" authed={props.auth.user} meta={props.meta}>
      <Breadcrumbs navList={[{ label: 'Beranda' }]} />
      
      <Divider my={32} />
      
      <Center bg="gold.1" h="25vh" style={{
        borderRadius: 16,
      }}>
        <Title order={1} c="gold.9">
          Selamat datang, {props.auth.user.full_name}!
        </Title>
      </Center>
    </AppLayout>
  )
}

export default Dashboard
