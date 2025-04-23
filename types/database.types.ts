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
      event_prices: {
        Row: {
          created_at: string
          event_id: string
          id: string
          price: number
          quantity_available: number
          type: string
        }
        Insert: {
          created_at?: string
          event_id?: string
          id?: string
          price: number
          quantity_available: number
          type: string
        }
        Update: {
          created_at?: string
          event_id?: string
          id?: string
          price?: number
          quantity_available?: number
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_prices_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          aditional_info: Json[] | null
          capacity: number
          created_at: string
          date: string
          description: string | null
          ends_at: string
          event_image: string
          id: string
          is_active: boolean
          is_online: boolean
          name: string
          prices: Json | null
          starts_at: string
          status: string
          updated_at: string
          url: string | null
          user_manager: string
        }
        Insert: {
          aditional_info?: Json[] | null
          capacity?: number
          created_at?: string
          date: string
          description?: string | null
          ends_at: string
          event_image: string
          id?: string
          is_active?: boolean
          is_online?: boolean
          name: string
          prices?: Json | null
          starts_at: string
          status: string
          updated_at?: string
          url?: string | null
          user_manager: string
        }
        Update: {
          aditional_info?: Json[] | null
          capacity?: number
          created_at?: string
          date?: string
          description?: string | null
          ends_at?: string
          event_image?: string
          id?: string
          is_active?: boolean
          is_online?: boolean
          name?: string
          prices?: Json | null
          starts_at?: string
          status?: string
          updated_at?: string
          url?: string | null
          user_manager?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_user_manager_fkey"
            columns: ["user_manager"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
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
            foreignKeyName: "locations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
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
        Relationships: [
          {
            foreignKeyName: "payments_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tickets: {
        Row: {
          code: string
          created_at: string
          event_id: string
          id: string
          name: string
          price_id: string
          staus: Database["public"]["Enums"]["ticket_status"]
          updated_at: string
        }
        Insert: {
          code?: string
          created_at?: string
          event_id: string
          id?: string
          name: string
          price_id: string
          staus?: Database["public"]["Enums"]["ticket_status"]
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          event_id?: string
          id?: string
          name?: string
          price_id?: string
          staus?: Database["public"]["Enums"]["ticket_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tickets_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_price_id_fkey"
            columns: ["price_id"]
            isOneToOne: false
            referencedRelation: "event_prices"
            referencedColumns: ["id"]
          },
        ]
      }
      tickets_sold: {
        Row: {
          created_at: string
          event_id: string
          id: string
          is_active: boolean
          payment_id: string
          status: Database["public"]["Enums"]["ticket_status"] | null
          user_id: string
        }
        Insert: {
          created_at?: string
          event_id: string
          id?: string
          is_active?: boolean
          payment_id: string
          status?: Database["public"]["Enums"]["ticket_status"] | null
          user_id: string
        }
        Update: {
          created_at?: string
          event_id?: string
          id?: string
          is_active?: boolean
          payment_id?: string
          status?: Database["public"]["Enums"]["ticket_status"] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tickets_sold_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_sold_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_sold_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
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
        | "valid"
        | "invalid"
        | "canceled"
        | "redeemed"
        | "pending"
        | "refunded"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      ticket_status: [
        "valid",
        "invalid",
        "canceled",
        "redeemed",
        "pending",
        "refunded",
      ],
    },
  },
} as const
