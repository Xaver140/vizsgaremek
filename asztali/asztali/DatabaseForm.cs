using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace asztali
{
    public partial class DatabaseForm : Form
    {
        string cs = "server=localhost;user=root;password=;database=cinema;";
        public DatabaseForm()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            using (MySqlConnection conn = new MySqlConnection("server=localhost;uid=root;database=mozi_adat;port=3307;pwd=;"))
            {
                conn.Open();

                string sql = "SELECT * FROM users";
                MySqlCommand cmd = new MySqlCommand(sql, conn);

                using (MySqlDataReader reader = cmd.ExecuteReader())
                {
                    listBox1.Items.Clear();

                    while (reader.Read())
                    {
                        listBox1.Items.Add(reader["full_name"].ToString() + " - " + reader["phone_number"].ToString() + " - " + reader["email"].ToString());
                    }
                }
            }
        }

        private void LoadList()
        {
            try
            {
                listBox1.Items.Clear();

                using (var conn = new MySqlConnection(cs))
                {
                    conn.Open();

                    using (var cmd = new MySqlCommand("SELECT name, phone, email FROM users", conn))
                    using (var reader = cmd.ExecuteReader())   // EZ FONTOS: using
                    {
                        while (reader.Read())
                        {
                            string line = $"{reader.GetString(0)} - {reader.GetString(1)} - {reader.GetString(2)}";
                            listBox1.Items.Add(line);
                        }
                    } // reader biztos bezár
                } // conn biztos bezár
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.ToString(), "LoadList hiba");
            }
        }


        private void listBox1_SelectedIndexChanged(object sender, EventArgs e)
        {

        }

        private void Update_Click(object sender, EventArgs e)
        {
            if (listBox1.SelectedItem == null)
            {
                MessageBox.Show("Válassz ki egy elemet!");
                return;
            }

            string newEmail = Microsoft.VisualBasic.Interaction.InputBox("Új email:");

            if (string.IsNullOrWhiteSpace(newEmail))
                return;

            try
            {
                var selected = listBox1.SelectedItem.ToString();

                using (var conn = new MySql.Data.MySqlClient.MySqlConnection(cs))
                {
                    conn.Open();

                    using (var cmd = new MySql.Data.MySqlClient.MySqlCommand(
                        "UPDATE users SET email=@e WHERE fulltext=@t", conn))
                    {
                        cmd.Parameters.AddWithValue("@e", newEmail.Trim());
                        cmd.Parameters.AddWithValue("@t", selected);
                        cmd.ExecuteNonQuery();
                    }
                }

                LoadList(); // ezután jön a gond nálad -> ott lesz a hiba
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.ToString(), "Update hiba");
            }
        }

        private void Insert_Click(object sender, EventArgs e)
        {
            string name = Microsoft.VisualBasic.Interaction.InputBox("Név:");
            string phone = Microsoft.VisualBasic.Interaction.InputBox("Telefon:");
            string email = Microsoft.VisualBasic.Interaction.InputBox("Email:");

            using (var conn = new MySqlConnection(cs))
            {
                conn.Open();

                var cmd = new MySqlCommand(
                    "INSERT INTO users(name, phone, email) VALUES(@n,@p,@e)", conn);

                cmd.Parameters.AddWithValue("@n", name);
                cmd.Parameters.AddWithValue("@p", phone);
                cmd.Parameters.AddWithValue("@e", email);

                cmd.ExecuteNonQuery();
            }

            LoadList();
        }

        private void Delete_Click(object sender, EventArgs e)
        {
            if (listBox1.SelectedItem == null)
            {
                MessageBox.Show("Nincs kiválasztva elem!");
                return;
            }

            var selected = listBox1.SelectedItem.ToString();

            var ok = MessageBox.Show("Biztos törlöd?", "Delete", MessageBoxButtons.YesNo);
            if (ok != DialogResult.Yes) return;

            using (var conn = new MySqlConnection(cs))
            {
                conn.Open();

                var cmd = new MySqlCommand("DELETE FROM users WHERE fulltext=@t", conn);
                cmd.Parameters.AddWithValue("@t", selected);
                cmd.ExecuteNonQuery();
            }

            LoadList();
        }

        private void BacktoMain_Click(object sender, EventArgs e)
        {
            this.Close();
        }
    }
}
