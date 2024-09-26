'use client'

import React, { useState, useEffect } from 'react'
import { Moon, Sun, Bell, Edit2, Trash2, ChevronDown, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'

const estadosCliente = [
  { valor: 'indefinido', etiqueta: 'Indefinido', color: 'bg-gray-200' },
  { valor: 'interesado', etiqueta: 'Interesado', color: 'bg-green-200' },
  { valor: 'contactado', etiqueta: 'Contactado', color: 'bg-blue-200' },
  { valor: 'en-negociacion', etiqueta: 'En negociación', color: 'bg-yellow-200' },
  { valor: 'no-interesado', etiqueta: 'No interesado', color: 'bg-red-200' }
]

const clientesIniciales = [
  { id: 1, nombre: 'Juan', apellido: 'Pérez', zona: 'Centro', estado: 'interesado', origen: 'Web', contacto: 'juan@example.com' },
  { id: 2, nombre: 'María', apellido: 'González', zona: 'Norte', estado: 'contactado', origen: 'Referido', contacto: 'maria@example.com' },
  { id: 3, nombre: 'Carlos', apellido: 'Rodríguez', zona: 'Sur', estado: 'en-negociacion', origen: 'Llamada', contacto: 'carlos@example.com' },
  { id: 4, nombre: 'Ana', apellido: 'Martínez', zona: 'Este', estado: 'interesado', origen: 'Web', contacto: 'ana@example.com' },
  { id: 5, nombre: 'Luis', apellido: 'Sánchez', zona: 'Oeste', estado: 'no-interesado', origen: 'Feria', contacto: 'luis@example.com' },
  { id: 6, nombre: 'Elena', apellido: 'López', zona: 'Centro', estado: 'contactado', origen: 'Referido', contacto: 'elena@example.com' },
  { id: 7, nombre: 'Pedro', apellido: 'García', zona: 'Norte', estado: 'en-negociacion', origen: 'Llamada', contacto: 'pedro@example.com' },
  { id: 8, nombre: 'Sofía', apellido: 'Fernández', zona: 'Sur', estado: 'interesado', origen: 'Web', contacto: 'sofia@example.com' },
  { id: 9, nombre: 'Miguel', apellido: 'Torres', zona: 'Este', estado: 'indefinido', origen: 'Feria', contacto: 'miguel@example.com' },
  { id: 10, nombre: 'Laura', apellido: 'Ramírez', zona: 'Oeste', estado: 'contactado', origen: 'Referido', contacto: 'laura@example.com' },
  { id: 11, nombre: 'Javier', apellido: 'Herrera', zona: 'Centro', estado: 'no-interesado', origen: 'Llamada', contacto: 'javier@example.com' },
  { id: 12, nombre: 'Carmen', apellido: 'Díaz', zona: 'Norte', estado: 'interesado', origen: 'Web', contacto: 'carmen@example.com' },
  { id: 13, nombre: 'Alberto', apellido: 'Moreno', zona: 'Sur', estado: 'en-negociacion', origen: 'Feria', contacto: 'alberto@example.com' },
  { id: 14, nombre: 'Isabel', apellido: 'Jiménez', zona: 'Este', estado: 'contactado', origen: 'Referido', contacto: 'isabel@example.com' },
  { id: 15, nombre: 'Raúl', apellido: 'Vargas', zona: 'Oeste', estado: 'indefinido', origen: 'Llamada', contacto: 'raul@example.com' },
  { id: 16, nombre: 'Marta', apellido: 'Castro', zona: 'Centro', estado: 'interesado', origen: 'Web', contacto: 'marta@example.com' },
  { id: 17, nombre: 'Alejandro', apellido: 'Ortiz', zona: 'Norte', estado: 'no-interesado', origen: 'Feria', contacto: 'alejandro@example.com' },
  { id: 18, nombre: 'Lucía', apellido: 'Ramos', zona: 'Sur', estado: 'contactado', origen: 'Referido', contacto: 'lucia@example.com' },
  { id: 19, nombre: 'Daniel', apellido: 'Mendoza', zona: 'Este', estado: 'en-negociacion', origen: 'Llamada', contacto: 'daniel@example.com' },
  { id: 20, nombre: 'Patricia', apellido: 'Flores', zona: 'Oeste', estado: 'interesado', origen: 'Web', contacto: 'patricia@example.com' }
]

const agentes = [
  { id: 1, nombre: 'Ana López' },
  { id: 2, nombre: 'Pedro Martínez' },
  { id: 3, nombre: 'Laura Sánchez' }
]

const zonas = ['Centro', 'Norte', 'Sur', 'Este', 'Oeste']

export function CrmInmobiliario () {
  const [modoOscuro, setModoOscuro] = useState(false)
  const [clientes, setClientes] = useState(clientesIniciales)
  const [clientesFiltrados, setClientesFiltrados] = useState(clientesIniciales)
  const [clienteEnEdicion, setClienteEnEdicion] = useState(null)
  const [mostrarDialogo, setMostrarDialogo] = useState(false)
  const [mostrarDialogoNotificacion, setMostrarDialogoNotificacion] = useState(false)
  const [notificaciones, setNotificaciones] = useState([])
  const [nuevaNotificacion, setNuevaNotificacion] = useState({ motivo: '', descripcion: '', agentes: [] })
  const [busqueda, setBusqueda] = useState('')
  const [filtroZona, setFiltroZona] = useState('')
  const [filtroEstado, setFiltroEstado] = useState('')

  useEffect(() => {
    let resultado = clientes
    if (busqueda) {
      resultado = resultado.filter(cliente =>
        cliente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        cliente.apellido.toLowerCase().includes(busqueda.toLowerCase()) ||
        cliente.contacto.toLowerCase().includes(busqueda.toLowerCase())
      )
    }
    if (filtroZona) {
      resultado = resultado.filter(cliente => cliente.zona === filtroZona)
    }
    if (filtroEstado) {
      resultado = resultado.filter(cliente => cliente.estado === filtroEstado)
    }
    setClientesFiltrados(resultado)
  }, [clientes, busqueda, filtroZona, filtroEstado])

  const cambiarEstadoCliente = (id: number, nuevoEstado: string) => {
    setClientes(clientes.map(cliente =>
      cliente.id === id ? { ...cliente, estado: nuevoEstado } : cliente
    ))
  }

  const editarCliente = (cliente: React.SetStateAction<null>) => {
    setClienteEnEdicion(cliente)
    setMostrarDialogo(true)
  }

  const borrarCliente = (id: number) => {
    setClientes(clientes.filter(cliente => cliente.id !== id))
  }

  const guardarCliente = (clienteEditado) => {
    if (clienteEditado.id) {
      setClientes(clientes.map(cliente =>
        cliente.id === clienteEditado.id ? clienteEditado : cliente
      ))
    } else {
      setClientes([...clientes, { ...clienteEditado, id: Date.now() }])
    }
    setMostrarDialogo(false)
    setClienteEnEdicion(null)
  }

  const enviarNotificacion = () => {
    if (nuevaNotificacion.motivo && nuevaNotificacion.descripcion && nuevaNotificacion.agentes.length > 0) {
      setNotificaciones([...notificaciones, { ...nuevaNotificacion, id: Date.now() }])
      setNuevaNotificacion({ motivo: '', descripcion: '', agentes: [] })
      setMostrarDialogoNotificacion(false)
    }
  }

  const FormularioCliente = ({ cliente, onGuardar }) => {
    const [formData, setFormData] = useState(cliente || {
      nombre: '', apellido: '', zona: '', estado: 'indefinido', origen: '', contacto: ''
    })

    const handleChange = (e: { target: { name: unknown; value: unknown } }) => {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: { preventDefault: () => void }) => {
      e.preventDefault()
      onGuardar(formData)
    }

    return (
      <form onSubmit={handleSubmit} className='space-y-4'>
        <Input name='nombre' value={formData.nombre} onChange={handleChange} placeholder='Nombre' required />
        <Input name='apellido' value={formData.apellido} onChange={handleChange} placeholder='Apellido' required />
        <select name='zona' value={formData.zona} onChange={handleChange} className='w-full p-2 border rounded' required>
          <option value=''>Seleccionar zona</option>
          {zonas.map(zona => (
            <option key={zona} value={zona}>{zona}</option>
          ))}
        </select>
        <select name='estado' value={formData.estado} onChange={handleChange} className='w-full p-2 border rounded'>
          {estadosCliente.map(estado => (
            <option key={estado.valor} value={estado.valor}>{estado.etiqueta}</option>
          ))}
        </select>
        <Input name='origen' value={formData.origen} onChange={handleChange} placeholder='Origen del lead' required />
        <Input name='contacto' value={formData.contacto} onChange={handleChange} placeholder='Contacto' required />
        <Button type='submit'>Guardar</Button>
      </form>
    )
  }

  return (
    <div className={`min-h-screen ${modoOscuro ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className='flex'>
        {/* Navegación lateral */}
        <nav className='w-64 bg-white dark:bg-gray-800 h-screen p-4'>
          <h1 className='text-2xl font-bold mb-6'>CRM Inmobiliaria</h1>
          <ul className='space-y-2'>
            {['Dashboard', 'Clientes', 'Zonas', 'Estados', 'Correos', 'Configuración'].map((item) => (
              <li key={item} className='p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded'>
                {item}
              </li>
            ))}
          </ul>
        </nav>

        {/* Contenido Principal */}
        <main className='flex-1 p-8'>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-3xl font-bold'>Dashboard</h2>
            <div className='flex items-center space-x-4'>
              <Button onClick={() => setModoOscuro(!modoOscuro)}>
                {modoOscuro ? <Sun className='w-4 h-4' /> : <Moon className='w-4 h-4' />}
              </Button>
              <Dialog open={mostrarDialogoNotificacion} onOpenChange={setMostrarDialogoNotificacion}>
                <DialogTrigger asChild>
                  <Button variant='ghost'>
                    <Bell className='w-6 h-6' />
                    {notificaciones.length > 0 && (
                      <span className='absolute top-5 right-5 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full'>
                        {notificaciones.length}
                      </span>
                    )}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Enviar Notificación</DialogTitle>
                  </DialogHeader>
                  <div className='space-y-4'>
                    <Input
                      placeholder='Motivo de la notificación'
                      value={nuevaNotificacion.motivo}
                      onChange={(e) => setNuevaNotificacion({ ...nuevaNotificacion, motivo: e.target.value })}
                    />
                    <Textarea
                      placeholder='Descripción de la notificación'
                      value={nuevaNotificacion.descripcion}
                      onChange={(e) => setNuevaNotificacion({ ...nuevaNotificacion, descripcion: e.target.value })}
                    />
                    <div>
                      <h3 className='mb-2 font-semibold'>Seleccionar agentes:</h3>
                      {agentes.map(agente => (
                        <div key={agente.id} className='flex items-center space-x-2'>
                          <Checkbox
                            id={`agente-${agente.id}`}
                            checked={nuevaNotificacion.agentes.includes(agente.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setNuevaNotificacion({ ...nuevaNotificacion, agentes: [...nuevaNotificacion.agentes, agente.id] })
                              } else {
                                setNuevaNotificacion({ ...nuevaNotificacion, agentes: nuevaNotificacion.agentes.filter(id => id !== agente.id) })
                              }
                            }}
                          />
                          <label htmlFor={`agente-${agente.id}`}>{agente.nombre}</label>
                        </div>
                      ))}
                    </div>
                    <Button onClick={enviarNotificacion}>Enviar Notificación</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Búsqueda y Filtros */}
          <div className='mb-4 flex space-x-2'>
            <Input
              placeholder='Buscar clientes...'
              className='flex-grow'
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline'>Filtrar por zona</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFiltroZona('')}>Todas las zonas</DropdownMenuItem>
                {zonas.map((zona) => (
                  <DropdownMenuItem key={zona} onClick={() => setFiltroZona(zona)}>{zona}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline'>Filtrar por estado</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFiltroEstado('')}>Todos los estados</DropdownMenuItem>
                {estadosCliente.map((estado) => (
                  <DropdownMenuItem key={estado.valor} onClick={() => setFiltroEstado(estado.valor)}>{estado.etiqueta}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Dialog open={mostrarDialogo} onOpenChange={setMostrarDialogo}>
              <DialogTrigger asChild>
                <Button onClick={() => setClienteEnEdicion(null)}>
                  <Plus className='w-4 h-4 mr-2' /> Nuevo Lead
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{clienteEnEdicion ? 'Editar Lead' : 'Nuevo Lead'}</DialogTitle>
                </DialogHeader>
                <FormularioCliente cliente={clienteEnEdicion} onGuardar={guardarCliente} />
              </DialogContent>
            </Dialog>
          </div>

          {/* Tabla de Clientes */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Apellido</TableHead>
                <TableHead>Zona</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Origen del lead</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientesFiltrados.map((cliente) => (
                <TableRow key={cliente.id}>
                  <TableCell>{cliente.nombre}</TableCell>
                  <TableCell>{cliente.apellido}</TableCell>
                  <TableCell>{cliente.zona}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant='outline' className={`${estadosCliente.find(e => e.valor === cliente.estado).color} text-black`}>
                          {estadosCliente.find(e => e.valor === cliente.estado).etiqueta}
                          <ChevronDown className='ml-2 h-4 w-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className='border-2 p-0 border-gray-500 shadow-lg'>
                        {estadosCliente.map((estado) => (
                          <DropdownMenuItem
                            key={estado.valor}
                            onClick={() => cambiarEstadoCliente(cliente.id, estado.valor)}
                            className={`${estado.color} text-black transition-colors duration-200 ease-in-out hover:brightness-90 hover:scale-105`}
                          >
                            {estado.etiqueta}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell>{cliente.origen}</TableCell>
                  <TableCell>{cliente.contacto}</TableCell>
                  <TableCell>
                    <Button variant='ghost' size='icon' onClick={() => editarCliente(cliente)}>
                      <Edit2 className='w-4 h-4' />
                    </Button>
                    <Button variant='ghost' size='icon' onClick={() => borrarCliente(cliente.id)}>
                      <Trash2 className='w-4 h-4' />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Lista de Notificaciones */}
          {notificaciones.length > 0 && (
            <div className='mt-8'>
              <h3 className='text-xl font-bold mb-4'>Notificaciones</h3>
              <ul className='space-y-4'>
                {notificaciones.map((notificacion) => (
                  <li key={notificacion.id} className='bg-white dark:bg-gray-800 p-4 rounded-lg shadow'>
                    <h4 className='font-bold'>{notificacion.motivo}</h4>
                    <p>{notificacion.descripcion}</p>
                    <p className='text-sm text-gray-500 dark:text-gray-400 mt-2'>
                      Enviado a: {notificacion.agentes.map(id => agentes.find(a => a.id === id).nombre).join(', ')}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
