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
      event_seats: {
        Row: {
          created_at: string | null
          event_id: string
          expires_at: string | null
          id: string
          price: number | null
          purchased_at: string | null
          reserved_at: string | null
          seat_id: string
          status: string
          transaction_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_id: string
          expires_at?: string | null
          id?: string
          price?: number | null
          purchased_at?: string | null
          reserved_at?: string | null
          seat_id: string
          status?: string
          transaction_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_id?: string
          expires_at?: string | null
          id?: string
          price?: number | null
          purchased_at?: string | null
          reserved_at?: string | null
          seat_id?: string
          status?: string
          transaction_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_seats_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_seats_seat_id_fkey"
            columns: ["seat_id"]
            isOneToOne: false
            referencedRelation: "seats"
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
          display_map: boolean
          duration: number | null
          ends_at: string
          event_image: string
          id: string
          image_url: string | null
          is_active: boolean
          is_online: boolean
          map: boolean
          name: string
          prices: Json | null
          starts_at: string
          status: string
          updated_at: string
          url: string | null
          user_id: string | null
          venue_id: string
        }
        Insert: {
          aditional_info?: Json[] | null
          capacity?: number
          created_at?: string
          date: string
          description?: string | null
          display_map?: boolean
          duration?: number | null
          ends_at: string
          event_image: string
          id?: string
          image_url?: string | null
          is_active?: boolean
          is_online?: boolean
          map?: boolean
          name: string
          prices?: Json | null
          starts_at: string
          status: string
          updated_at?: string
          url?: string | null
          user_id?: string | null
          venue_id: string
        }
        Update: {
          aditional_info?: Json[] | null
          capacity?: number
          created_at?: string
          date?: string
          description?: string | null
          display_map?: boolean
          duration?: number | null
          ends_at?: string
          event_image?: string
          id?: string
          image_url?: string | null
          is_active?: boolean
          is_online?: boolean
          map?: boolean
          name?: string
          prices?: Json | null
          starts_at?: string
          status?: string
          updated_at?: string
          url?: string | null
          user_id?: string | null
          venue_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "venues"
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
      orders: {
        Row: {
          created_at: string | null
          event_id: string
          id: string
          payment_id: string | null
          payment_method: string | null
          status: string
          total_amount: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          event_id: string
          id?: string
          payment_id?: string | null
          payment_method?: string | null
          status?: string
          total_amount: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          event_id?: string
          id?: string
          payment_id?: string | null
          payment_method?: string | null
          status?: string
          total_amount?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_event_id_fkey"
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
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      seats: {
        Row: {
          created_at: string | null
          id: string
          number: string
          row: string
          seat_id: string
          section_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          number: string
          row: string
          seat_id: string
          section_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          number?: string
          row?: string
          seat_id?: string
          section_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "seats_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
        ]
      }
      sections: {
        Row: {
          color: string
          created_at: string | null
          id: string
          name: string
          price: number
          updated_at: string | null
          venue_id: string
        }
        Insert: {
          color: string
          created_at?: string | null
          id?: string
          name: string
          price: number
          updated_at?: string | null
          venue_id: string
        }
        Update: {
          color?: string
          created_at?: string | null
          id?: string
          name?: string
          price?: number
          updated_at?: string | null
          venue_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sections_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "venues"
            referencedColumns: ["id"]
          },
        ]
      }
      tickets: {
        Row: {
          created_at: string | null
          event_seat_id: string
          id: string
          is_used: boolean | null
          order_id: string
          ticket_code: string
          updated_at: string | null
          used_at: string | null
        }
        Insert: {
          created_at?: string | null
          event_seat_id: string
          id?: string
          is_used?: boolean | null
          order_id: string
          ticket_code: string
          updated_at?: string | null
          used_at?: string | null
        }
        Update: {
          created_at?: string | null
          event_seat_id?: string
          id?: string
          is_used?: boolean | null
          order_id?: string
          ticket_code?: string
          updated_at?: string | null
          used_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tickets_event_seat_id_fkey"
            columns: ["event_seat_id"]
            isOneToOne: false
            referencedRelation: "event_seats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
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
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          birthdate: string | null
          created_at: string
          email: string | null
          gender: string | null
          id: string
          is_admin: boolean
          name: string | null
          phone: number | null
        }
        Insert: {
          birthdate?: string | null
          created_at?: string
          email?: string | null
          gender?: string | null
          id: string
          is_admin?: boolean
          name?: string | null
          phone?: number | null
        }
        Update: {
          birthdate?: string | null
          created_at?: string
          email?: string | null
          gender?: string | null
          id?: string
          is_admin?: boolean
          name?: string | null
          phone?: number | null
        }
        Relationships: []
      }
      venues: {
        Row: {
          address: string | null
          capacity: number | null
          city: string | null
          created_at: string | null
          id: string
          name: string
          svg_map: string
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          capacity?: number | null
          city?: string | null
          created_at?: string | null
          id?: string
          name: string
          svg_map: string
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          capacity?: number | null
          city?: string | null
          created_at?: string | null
          id?: string
          name?: string
          svg_map?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      release_expired_seats: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      requesting_user_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
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
