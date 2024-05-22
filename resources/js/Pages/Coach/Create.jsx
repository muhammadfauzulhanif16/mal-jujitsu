import { AppLayout } from '@/Layouts/AppLayout.jsx'
import {
  Avatar,
  Button,
  Divider,
  Fieldset,
  FileButton,
  Grid,
  Group,
  Radio,
  TextInput,
} from '@mantine/core'
import {
  IconCalendar,
  IconCornerDownLeft,
  IconId,
  IconMail,
  IconPassword,
  IconPhotoUp,
} from '@tabler/icons-react'
import { Breadcrumbs } from '@/Components/Breadcrumbs.jsx'
import { useForm } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import { DatePickerInput } from '@mantine/dates'
import 'dayjs/locale/id'

const Create = (props) => {
  const [file, setFile] = useState(null)
  
  const form = useForm({
    // _method: 'put',
    avatar: file,
    email: '',
    password: '',
    full_name: '',
    birth_date: '',
    role: '',
  })
  
  // console.log(form.data)
  // console.log(form)
  
  useEffect(() => {
    form.setData('avatar', file)
  }, [file])
  
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      
      form.post(route('coaches.store'), {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => {
          form.reset()
        },
      })
    }}>
      <AppLayout title="Pelatih" authed={props.auth.user} meta={props.meta}>
        <Grid
          justify="space-between"
          gutter={0}
        >
          <Grid.Col span={3}>
            <Breadcrumbs
              navList={[
                {
                  label: 'Pelatih',
                  route: 'coaches.index',
                }, {
                  label: 'Tambah',
                },
              ]}
            />
          </Grid.Col>
          
          <Grid.Col span={3}>
            <Button
              type="submit"
              fullWidth
              leftSection={<IconCornerDownLeft />}
              variant="filled"
              color="gold.1"
              h={48}
              radius={32}
              // onClick={() => router.get(route('coaches.create'))}
            >
              Tambah Pelatih
            </Button>
          </Grid.Col>
        </Grid>
        
        <Divider my={32} />
        
        <Grid
          grow
          justify="space-between"
        >
          <Grid.Col
            span={3}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <Avatar
              src={form.data.avatar instanceof File ? URL.createObjectURL(form.data.avatar) : form.data.avatar}
              alt={form.data.full_name}
              size={160}
            />
            <FileButton
              onChange={setFile}
              accept="image/png,image/jpeg,image/jpg">
              {(props) => (
                <Button
                  variant="subtle" {...props}
                  color="gold.1"
                  h={48}
                  radius={32}
                  fullWidth
                  leftSection={<IconPhotoUp />}
                >
                  Unggah Foto
                </Button>
              )}
            </FileButton>
          </Grid.Col>
          
          <Grid.Col
            span={8}
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
                  backgroundColor: 'var(--mantine-color-netral-9)',
                  border: 0,
                  margin: 0,
                  padding: 16,
                },
                legend: {
                  borderRadius: 20,
                  backgroundColor: 'var(--mantine-color-netral-9)',
                  fontSize: 16,
                  padding: 16,
                  fontWeight: 'bold',
                },
              }}>
              <TextInput
                withAsterisk
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
                mb={24}
                label="Alamat Surel"
                placeholder="Masukkan alamat surel..."
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
              
              <TextInput
                withAsterisk
                variant="filled"
                type="password"
                leftSection={<IconPassword />}
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
                label="kata Sandi"
                placeholder="Masukkan kata sandi..."
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
            </Fieldset>
            
            <Fieldset
              radius={16}
              legend="Informasi Pribadi"
              styles={{
                root: {
                  backgroundColor: 'var(--mantine-color-netral-9)',
                  border: 0,
                  margin: 0,
                  padding: 16,
                },
                legend: {
                  borderRadius: 20,
                  backgroundColor: 'var(--mantine-color-netral-9)',
                  fontSize: 16,
                  padding: 16,
                  fontWeight: 'bold',
                },
              }}>
              <TextInput
                withAsterisk
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
                label="Nama Lengkap"
                placeholder="Masukkan nama lengkap..."
                onChange={(e) => {
                  const value = e.target.value.replace(/\b\w/g, char => char.toUpperCase()).replace(/\B\w/g, char => char.toLowerCase())
                  form.setData('full_name', value)
                  
                  if (!value) {
                    form.setError({
                      full_name:
                        'Nama lengkap tidak boleh kosong.',
                    })
                  } else {
                    form.clearErrors('full_name')
                  }
                }}
                error={form.errors.full_name}
              />
              
              <DatePickerInput
                locale="id"
                monthsListFormat="MMMM"
                withAsterisk
                clearable
                allowDeselect
                firstDayOfWeek={0}
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
                onChange={(value) => {
                  form.setData('birth_date', value)
                  
                  if (!value) {
                    form.setError({
                      birth_date:
                        'Tanggal lahir tidak boleh kosong.',
                    })
                  } else {
                    form.clearErrors('birth_date')
                  }
                }}
                error={form.errors.birth_date}
              />
              {/*</DatesProvider>*/}
            </Fieldset>
            
            <Fieldset
              radius={16}
              legend="Informasi Pelatih"
              styles={{
                root: {
                  backgroundColor: 'var(--mantine-color-netral-9)',
                  border: 0,
                  margin: 0,
                  padding: 16,
                },
                legend: {
                  borderRadius: 20,
                  backgroundColor: 'var(--mantine-color-netral-9)',
                  fontSize: 16,
                  padding: 16,
                  fontWeight: 'bold',
                },
              }}
            >
              <Radio.Group
                label="Peran"
                withAsterisk
                styles={{
                  label: {
                    marginBottom: 12,
                  },
                  error: {
                    marginTop: 12,
                  },
                }}
                onChange={(value) => {
                  form.setData('role', value)
                  
                  if (!value) {
                    form.setError({
                      role: 'Peran tidak boleh kosong.',
                    })
                  } else {
                    form.clearErrors('role')
                  }
                }}
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
    </form>
  )
}

export default Create
