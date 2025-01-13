export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      events: {
        Row: {
          aditional_info: string | null
          capacity: number
          created_at: string
          date: string
          description: string | null
          ends_at: string
          event_image: string
          id: string
          is_active: boolean
          is_online: boolean
          location_id: string
          name: string
          starts_at: string
          status: string
          updated_at: string
          url: string | null
          user_manager: string
        }
        Insert: {
          aditional_info?: string | null
          capacity?: number
          created_at?: string
          date: string
          description?: string | null
          ends_at: string
          event_image: string
          id?: string
          is_active?: boolean
          is_online?: boolean
          location_id: string
          name: string
          starts_at: string
          status: string
          updated_at?: string
          url?: string | null
          user_manager: string
        }
        Update: {
          aditional_info?: string | null
          capacity?: number
          created_at?: string
          date?: string
          description?: string | null
          ends_at?: string
          event_image?: string
          id?: string
          is_active?: boolean
          is_online?: boolean
          location_id?: string
          name?: string
          starts_at?: string
          status?: string
          updated_at?: string
          url?: string | null
          user_manager?: string
        }
        Relationships: []
      }
      locations: {
        Row: {
          address: string | null
          created_at: string
          event_id: string | null
          id: string
          name: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          event_id?: string | null
          id?: string
          name?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          created_at?: string
          event_id?: string | null
          id?: string
          name?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'locations_event_id_fkey'
            columns: ['event_id']
            isOneToOne: false
            referencedRelation: 'events'
            referencedColumns: ['id']
          }
        ]
      }
      payments: {
        Row: {
          ammount: number
          created_at: string
          id: string
          method: string
          status: string
          user_id: string
        }
        Insert: {
          ammount: number
          created_at?: string
          id?: string
          method: string
          status: string
          user_id: string
        }
        Update: {
          ammount?: number
          created_at?: string
          id?: string
          method?: string
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      tickets: {
        Row: {
          created_at: string
          event_id: string
          id: string
          name: string
          price: number
          seat: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          event_id: string
          id?: string
          name: string
          price?: number
          seat?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          event_id?: string
          id?: string
          name?: string
          price?: number
          seat?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'tickets_event_id_fkey'
            columns: ['event_id']
            isOneToOne: false
            referencedRelation: 'events'
            referencedColumns: ['id']
          }
        ]
      }
      tickets_sold: {
        Row: {
          created_at: string
          event_id: string
          id: string
          is_active: boolean
          payment_id: string
          status: Database['public']['Enums']['ticket_status'] | null
          user_id: string
        }
        Insert: {
          created_at?: string
          event_id: string
          id?: string
          is_active?: boolean
          payment_id: string
          status?: Database['public']['Enums']['ticket_status'] | null
          user_id: string
        }
        Update: {
          created_at?: string
          event_id?: string
          id?: string
          is_active?: boolean
          payment_id?: string
          status?: Database['public']['Enums']['ticket_status'] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'tickets_sold_event_id_fkey'
            columns: ['event_id']
            isOneToOne: false
            referencedRelation: 'events'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'tickets_sold_payment_id_fkey'
            columns: ['payment_id']
            isOneToOne: false
            referencedRelation: 'payments'
            referencedColumns: ['id']
          }
        ]
      }
      user_profiles: {
        Row: {
          birthdate: string | null
          created_at: string
          email: string | null
          gender: string | null
          id: string
          name: string | null
          phone: number | null
        }
        Insert: {
          birthdate?: string | null
          created_at?: string
          email?: string | null
          gender?: string | null
          id: string
          name?: string | null
          phone?: number | null
        }
        Update: {
          birthdate?: string | null
          created_at?: string
          email?: string | null
          gender?: string | null
          id?: string
          name?: string | null
          phone?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      ticket_status:
        | 'valid'
        | 'invalid'
        | 'canceled'
        | 'redeemed'
        | 'pending'
        | 'refunded'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
      PublicSchema['Views'])
  ? (PublicSchema['Tables'] &
      PublicSchema['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
  ? PublicSchema['Enums'][PublicEnumNameOrOptions]
  : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
  ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
  : never