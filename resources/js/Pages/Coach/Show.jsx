import { AppLayout } from '@/Layouts/AppLayout.jsx'
import {
  Avatar,
  Divider,
  Fieldset,
  Grid,
  Group,
  Radio,
  TextInput,
} from '@mantine/core'
import { IconCalendar, IconId, IconMail } from '@tabler/icons-react'
import { useForm } from '@inertiajs/react'
import { DatePickerInput } from '@mantine/dates'
import 'dayjs/locale/id'
import { Breadcrumbs } from '@/Components/Breadcrumbs.jsx'

const Show = (props) => {
  const form = useForm({
    avatar: props.user.avatar,
    email: props.user.email,
    full_name: props.user.full_name,
    birth_date: props.user.birth_date,
    role: props.user.role,
  })
  
  return (
    
    <AppLayout title="Pelatih" authed={props.auth.user} meta={props.meta}>
      <Breadcrumbs
        navList={[
          {
            label: 'Pelatih',
            route: 'coaches.index',
          }, {
            label: 'Rincian',
          },
        ]}
      />
      
      <Divider my={32} />
      
      <Grid
        grow
        justify="space-between"
      >
        <Grid.Col
          span={{
            base: 12,
            md: 3,
          }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <Avatar
            src={form.data.avatar}
            alt={form.data.full_name}
            size={160}
          />
        </Grid.Col>
        
        <Grid.Col
          span={{
            base: 12,
            md: 8,
          }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <Fieldset
            border={0}
            radius={16}
            legend="Informasi Akun"
            styles={{
              root: {
                margin: 0,
                padding: 16,
              },
              legend: {
                borderRadius: 20,
                fontSize: 16,
                padding: 16,
                fontWeight: 'bold',
              },
            }}>
            <TextInput
              variant="filled"
              leftSection={<IconMail />}
              styles={{
                label: {
                  marginBottom: 12,
                },
                error: {
                  marginTop: 12,
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
              }}
              label="Alamat Surel"
              placeholder="Masukkan alamat surel..."
              value={form.data.email}
              disabled
            />
          </Fieldset>
          
          <Fieldset
            radius={16}
            legend="Informasi Pribadi"
            styles={{
              root: {
                margin: 0,
                padding: 16,
              },
              legend: {
                borderRadius: 20,
                fontSize: 16,
                padding: 16,
                fontWeight: 'bold',
              },
            }}>
            <TextInput
              variant="filled"
              leftSection={<IconId />}
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
              mb={24}
              disabled
              label="Nama Lengkap"
              placeholder="Masukkan nama lengkap..."
              value={form.data.full_name}
            />
            
            <DatePickerInput
              locale="id"
              disabled
              variant="filled"
              valueFormat="dddd, D MMMM YYYY"
              leftSection={<IconCalendar />}
              label="Tanggal Lahir"
              placeholder="Masukkan tanggal lahir..."
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
                calendarHeader: {
                  // backgroundColor: 'red',
                  height: 48,
                },
                calendarHeaderControl: {
                  // backgroundColor: 'yellow',
                  height: 48,
                  width: 48,
                  borderRadius: 32,
                },
              }}
              value={new Date(form.data.birth_date)}
            />
          </Fieldset>
          
          <Fieldset
            radius={16}
            legend="Informasi Pelatih"
            styles={{
              root: {
                margin: 0,
                padding: 16,
              },
              legend: {
                borderRadius: 20,
                fontSize: 16,
                padding: 16,
                fontWeight: 'bold',
              },
            }}
          >
            <Radio.Group
              disabled
              label="Peran"
              styles={{
                label: {
                  marginBottom: 12,
                },
                error: {
                  marginTop: 12,
                },
              }}
              value={form.data.role}
            >
              <Group mt="xs">
                <Radio value="Manajer Tim" label="Manajer Tim"
                       color="gold.1" />
                <Radio value="Pelatih Fisik" label="Pelatih Fisik"
                       color="gold.1" />
                <Radio value="Pelatih Teknik" label="Pelatih Teknik"
                       color="gold.1" />
              </Group>
            </Radio.Group>
          </Fieldset>
        </Grid.Col>
      </Grid>
    </AppLayout>
  )
}

export default Show
