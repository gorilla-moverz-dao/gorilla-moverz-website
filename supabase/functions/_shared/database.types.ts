export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      banana_farm_allowlist: {
        Row: {
          created_at: string
          discord_user_id: string
          discord_user_name: string
          guild_id: string
          id: number
          wallet_address: string
        }
        Insert: {
          created_at?: string
          discord_user_id: string
          discord_user_name: string
          guild_id: string
          id?: number
          wallet_address: string
        }
        Update: {
          created_at?: string
          discord_user_id?: string
          discord_user_name?: string
          guild_id?: string
          id?: number
          wallet_address?: string
        }
        Relationships: []
      }
      banana_farm_collections: {
        Row: {
          collection_address: string
          created_at: string
          id: number
          name: string
          slug: string
        }
        Insert: {
          collection_address: string
          created_at?: string
          id?: number
          name: string
          slug: string
        }
        Update: {
          collection_address?: string
          created_at?: string
          id?: number
          name?: string
          slug?: string
        }
        Relationships: []
      }
      banana_farm_nfts: {
        Row: {
          collection_id: number
          created_at: string
          id: number
          image: string | null
          nft_number: number
        }
        Insert: {
          collection_id: number
          created_at?: string
          id?: number
          image?: string | null
          nft_number: number
        }
        Update: {
          collection_id?: number
          created_at?: string
          id?: number
          image?: string | null
          nft_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "banana_farmer_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "banana_farm_collections"
            referencedColumns: ["id"]
          },
        ]
      }
      partner: {
        Row: {
          benefits_gorillaz: string | null
          benefits_partner: string | null
          comments: string | null
          contact_discord: string | null
          created_at: string
          description: string | null
          id: number
          name: string
          socials: string | null
        }
        Insert: {
          benefits_gorillaz?: string | null
          benefits_partner?: string | null
          comments?: string | null
          contact_discord?: string | null
          created_at?: string
          description?: string | null
          id?: number
          name: string
          socials?: string | null
        }
        Update: {
          benefits_gorillaz?: string | null
          benefits_partner?: string | null
          comments?: string | null
          contact_discord?: string | null
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          socials?: string | null
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

