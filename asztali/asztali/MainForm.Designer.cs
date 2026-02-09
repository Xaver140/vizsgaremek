namespace asztali
{
    partial class MainForm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            dgvFilmek = new DataGridView();
            btnLoadFilmek = new Button();
            label1 = new Label();
            btnBack = new Button();
            button1 = new Button();
            ((System.ComponentModel.ISupportInitialize)dgvFilmek).BeginInit();
            SuspendLayout();
            // 
            // dgvFilmek
            // 
            dgvFilmek.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            dgvFilmek.Location = new Point(27, 24);
            dgvFilmek.Name = "dgvFilmek";
            dgvFilmek.Size = new Size(150, 111);
            dgvFilmek.TabIndex = 0;
            // 
            // btnLoadFilmek
            // 
            btnLoadFilmek.Location = new Point(230, 20);
            btnLoadFilmek.Name = "btnLoadFilmek";
            btnLoadFilmek.Size = new Size(180, 147);
            btnLoadFilmek.TabIndex = 1;
            btnLoadFilmek.Text = "Filmek betöltése";
            btnLoadFilmek.UseVisualStyleBackColor = true;
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Location = new Point(412, 386);
            label1.Name = "label1";
            label1.Size = new Size(62, 15);
            label1.TabIndex = 2;
            label1.Text = "MainForm";
            // 
            // btnBack
            // 
            btnBack.Location = new Point(39, 281);
            btnBack.Name = "btnBack";
            btnBack.Size = new Size(207, 122);
            btnBack.TabIndex = 3;
            btnBack.Text = "Vissza";
            btnBack.UseVisualStyleBackColor = true;
            btnBack.Click += btnBack_Click;
            // 
            // button1
            // 
            button1.Location = new Point(322, 199);
            button1.Name = "button1";
            button1.Size = new Size(143, 118);
            button1.TabIndex = 4;
            button1.Text = "button1";
            button1.UseVisualStyleBackColor = true;
            button1.Click += button1_Click;
            // 
            // MainForm
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(800, 450);
            Controls.Add(button1);
            Controls.Add(btnBack);
            Controls.Add(label1);
            Controls.Add(btnLoadFilmek);
            Controls.Add(dgvFilmek);
            Name = "MainForm";
            Text = "Main Form";
            ((System.ComponentModel.ISupportInitialize)dgvFilmek).EndInit();
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private DataGridView dgvFilmek;
        private Button btnLoadFilmek;
        private Label label1;
        private Button btnBack;
        private Button button1;
    }
}