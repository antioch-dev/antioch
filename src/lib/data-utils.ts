import {
  mockTenures,
  mockPositions,
  mockDepartments,
  mockPersons,
  mockAppointments,
  mockPermissions,
  mockDepartmentMembers,
  mockUsers,
  MOCK_FELLOWSHIP_ID,
} from "./mock-data"
import type {
  Tenure,
  Position,
  Department,
  Person,
  Appointment,
  Permission,
  AppointmentWithDetails,
  PositionWithDepartment,
  TenureStats,
  DepartmentMember,
  User,
  DepartmentWithMembers,
  PersonWithDepartments,
} from "./mock-data"

// Utility functions for working with mock data

export function getTenures(fellowshipId: string = MOCK_FELLOWSHIP_ID): Tenure[] {
  return mockTenures.filter((tenure) => tenure.fellowshipId === fellowshipId)
}

export function getTenureById(id: string): Tenure | undefined {
  return mockTenures.find((tenure) => tenure.id === id)
}

export function getActiveTenure(fellowshipId: string = MOCK_FELLOWSHIP_ID): Tenure | undefined {
  return mockTenures.find((tenure) => tenure.fellowshipId === fellowshipId && tenure.status === "active")
}

export function getPositions(fellowshipId: string = MOCK_FELLOWSHIP_ID): Position[] {
  return mockPositions.filter((position) => position.fellowshipId === fellowshipId)
}

export function getPositionsWithDepartments(fellowshipId: string = MOCK_FELLOWSHIP_ID): PositionWithDepartment[] {
  const positions = getPositions(fellowshipId)
  const departments = getDepartments(fellowshipId)

  return positions.map((position) => ({
    ...position,
    department: position.departmentId ? departments.find((dept) => dept.id === position.departmentId) : undefined,
  }))
}

export function getDepartments(fellowshipId: string = MOCK_FELLOWSHIP_ID): Department[] {
  return mockDepartments.filter((department) => department.fellowshipId === fellowshipId)
}

export function getDepartmentById(fellowshipId: string, departmentId: string): Department | undefined {
  return mockDepartments.find(
    (department) => department.fellowshipId === fellowshipId && department.id === departmentId,
  )
}

export function getPersons(fellowshipId: string = MOCK_FELLOWSHIP_ID): Person[] {
  return mockPersons.filter((person) => person.fellowshipId === fellowshipId)
}

export function getAppointments(fellowshipId: string = MOCK_FELLOWSHIP_ID): Appointment[] {
  const tenures = getTenures(fellowshipId)
  const tenureIds = tenures.map((t) => t.id)
  return mockAppointments.filter((appointment) => tenureIds.includes(appointment.tenureId))
}

export function getAppointmentsWithDetails(fellowshipId: string = MOCK_FELLOWSHIP_ID): AppointmentWithDetails[] {
  const appointments = getAppointments(fellowshipId)
  const tenures = getTenures(fellowshipId)
  const positions = getPositions(fellowshipId)
  const departments = getDepartments(fellowshipId)
  const persons = getPersons(fellowshipId)

  return appointments.map((appointment) => {
    const tenure = tenures.find((t) => t.id === appointment.tenureId)!
    const position = positions.find((p) => p.id === appointment.positionId)!
    const person = persons.find((p) => p.id === appointment.personId)!
    const department = position.departmentId ? departments.find((d) => d.id === position.departmentId) : undefined

    return {
      ...appointment,
      tenure,
      position,
      person,
      department,
    }
  })
}

export function getAppointmentsByTenure(tenureId: string): AppointmentWithDetails[] {
  return getAppointmentsWithDetails().filter((appointment) => appointment.tenureId === tenureId)
}

export function getAppointmentsByDepartment(fellowshipId: string, departmentId: string): Appointment[] {
  const appointments = getAppointments(fellowshipId)
  const positions = getPositions(fellowshipId)

  // Get positions that belong to this department
  const departmentPositionIds = positions
    .filter((position) => position.departmentId === departmentId)
    .map((position) => position.id)

  // Return appointments for those positions
  return appointments.filter((appointment) => departmentPositionIds.includes(appointment.positionId))
}

export function getAppointmentByToken(token: string): AppointmentWithDetails | undefined {
  return getAppointmentsWithDetails().find((appointment) => appointment.inviteToken === token)
}

export function getTenureStats(fellowshipId: string = MOCK_FELLOWSHIP_ID): TenureStats {
  const tenures = getTenures(fellowshipId)
  const positions = getPositions(fellowshipId)
  const appointments = getAppointments(fellowshipId)

  return {
    totalTenures: tenures.length,
    activeTenures: tenures.filter((t) => t.status === "active").length,
    totalPositions: positions.filter((p) => p.isActive).length,
    totalAppointments: appointments.length,
    pendingAppointments: appointments.filter((a) => a.status === "pending").length,
  }
}

export function getPermissions(fellowshipId: string = MOCK_FELLOWSHIP_ID): Permission[] {
  return mockPermissions.filter((permission) => permission.fellowshipId === fellowshipId)
}

// Department member management functions
export function getDepartmentMembers(departmentId: string): DepartmentMember[] {
  return mockDepartmentMembers.filter((member) => member.departmentId === departmentId)
}

export function getDepartmentWithMembers(
  fellowshipId: string,
  departmentId: string,
): DepartmentWithMembers | undefined {
  const department = getDepartmentById(fellowshipId, departmentId)
  if (!department) return undefined

  const members = getDepartmentMembers(departmentId)
  const persons = getPersons(fellowshipId)
  const positions = getPositions(fellowshipId)

  const membersWithPersons = members.map((member) => ({
    ...member,
    person: persons.find((p) => p.id === member.personId)!,
  }))

  const positionCount = positions.filter((p) => p.departmentId === departmentId && p.isActive).length
  const leaderCount = members.filter((m) => m.role === "leader").length

  return {
    ...department,
    members: membersWithPersons,
    positionCount,
    leaderCount,
  }
}

export function getPersonWithDepartments(fellowshipId: string, personId: string): PersonWithDepartments | undefined {
  const person = mockPersons.find((p) => p.id === personId && p.fellowshipId === fellowshipId)
  if (!person) return undefined

  const departments = getDepartments(fellowshipId)
  const membershipRecords = mockDepartmentMembers.filter((m) => m.personId === personId)

  const departmentsWithMembership = membershipRecords.map((record) => ({
    ...record,
    department: departments.find((d) => d.id === record.departmentId)!,
  }))

  const currentAppointments = getAppointmentsWithDetails(fellowshipId).filter(
    (appointment) => appointment.personId === personId && appointment.status === "accepted",
  )

  return {
    ...person,
    departments: departmentsWithMembership,
    currentAppointments,
  }
}

export function getUsers(_fellowshipId: string = MOCK_FELLOWSHIP_ID): User[] {
  return mockUsers
}

export function getUserById(userId: string): User | undefined {
  return mockUsers.find((user) => user.id === userId)
}

// Mock API functions (simulate async operations)
export async function createTenure(tenure: Omit<Tenure, "id" | "createdAt" | "updatedAt">): Promise<Tenure> {
  const newTenure: Tenure = {
    ...tenure,
    id: `tenure_${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  mockTenures.push(newTenure)
  return newTenure
}

export async function updateAppointmentStatus(
  appointmentId: string,
  status: "accepted" | "declined",
): Promise<Appointment> {
  const appointment = mockAppointments.find((a) => a.id === appointmentId)
  if (!appointment) {
    throw new Error("Appointment not found")
  }

  appointment.status = status
  appointment.respondedAt = new Date().toISOString()
  appointment.updatedAt = new Date().toISOString()

  return appointment
}

// Department member management mock API functions
export async function addPersonToDepartment(
  departmentId: string,
  personId: string,
  role: "leader" | "member" = "member",
): Promise<DepartmentMember> {
  const newMember: DepartmentMember = {
    departmentId,
    personId,
    role,
    joinedAt: new Date().toISOString(),
  }
  mockDepartmentMembers.push(newMember)
  return newMember
}

export async function removePersonFromDepartment(departmentId: string, personId: string): Promise<boolean> {
  const index = mockDepartmentMembers.findIndex(
    (member) => member.departmentId === departmentId && member.personId === personId,
  )
  if (index === -1) return false

  mockDepartmentMembers.splice(index, 1)
  return true
}

export async function updateDepartmentMemberRole(
  departmentId: string,
  personId: string,
  role: "leader" | "member",
): Promise<DepartmentMember | null> {
  const member = mockDepartmentMembers.find((m) => m.departmentId === departmentId && m.personId === personId)
  if (!member) return null

  member.role = role
  return member
}

export async function createAppointment(
  tenureId: string,
  positionId: string,
  personId: string,
  appointedBy: string,
): Promise<Appointment> {
  const newAppointment: Appointment = {
    id: `appt_${Date.now()}`,
    tenureId,
    positionId,
    personId,
    status: "pending",
    inviteLink: `/fellowship_${MOCK_FELLOWSHIP_ID}/leadership/invite/token_${Date.now()}`,
    inviteToken: `token_${Date.now()}`,
    appointedBy,
    appointedAt: new Date().toISOString(),
    respondedAt: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  mockAppointments.push(newAppointment)
  return newAppointment
}

export async function createPosition(position: Omit<Position, "id" | "createdAt" | "updatedAt">): Promise<Position> {
  const newPosition: Position = {
    ...position,
    id: `pos_${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  mockPositions.push(newPosition)
  return newPosition
}

export async function createDepartment(
  department: Omit<Department, "id" | "createdAt" | "updatedAt">,
): Promise<Department> {
  const newDepartment: Department = {
    ...department,
    id: `dept_${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  mockDepartments.push(newDepartment)
  return newDepartment
}

export async function registerPerson(person: Omit<Person, "id" | "createdAt" | "updatedAt">): Promise<Person> {
  const newPerson: Person = {
    ...person,
    id: `person_${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  mockPersons.push(newPerson)
  return newPerson
}
