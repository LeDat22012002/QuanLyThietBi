using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Server.Models;

public partial class QLThietBiContext : DbContext
{
    public QLThietBiContext()
    {
    }

    public QLThietBiContext(DbContextOptions<QLThietBiContext> options)
        : base(options)
    {
    }

    public virtual DbSet<ThietBiCntt> ThietBiCntts { get; set; }
    public virtual DbSet<NguoiDung> NguoiDungs { get; set; }

    public virtual DbSet<NhanVien> NhanViens { get; set; }

    public virtual DbSet<PhongBan> PhongBans { get; set; }

    public virtual DbSet<Quyen> Quyens { get; set; }

//     protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    // #warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
    //         => optionsBuilder.UseSqlServer("Server=PCNTT-HPDQ34864\\DAT2025;Database=QLThietBi;User Id=sa;Password=Ronaldat@2026;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ThietBiCntt>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__ThietBiC__3214EC07C94B2A4B");

            entity.ToTable("ThietBiCNTT");

            entity.Property(e => e.DonViSuDung).HasMaxLength(200);
            entity.Property(e => e.LoaiThietBi).HasMaxLength(100);
            entity.Property(e => e.NgayNhap).HasColumnType("datetime");
            entity.Property(e => e.NguoiQuanLy).HasMaxLength(100);
            entity.Property(e => e.SerialNumber).HasMaxLength(100);
            entity.Property(e => e.ServiceTag).HasMaxLength(100);
            entity.Property(e => e.TenThietBi).HasMaxLength(200);
            entity.Property(e => e.TrangThai).HasMaxLength(50);

            modelBuilder.Entity<NguoiDung>(entity =>
        {
            entity.HasKey(e => e.IdnguoiDung);

            entity.ToTable("NguoiDung");

            entity.Property(e => e.IdnguoiDung).HasColumnName("IDNguoiDung");
            entity.Property(e => e.Idquyen).HasColumnName("IDQuyen");
            entity.Property(e => e.MatKhau).HasMaxLength(50);
            entity.Property(e => e.NhanVienId).HasColumnName("NhanVienID");
            // entity.Property(e => e.RefreshToken).HasMaxLength(255);
            entity.Property(e => e.TenDangNhap)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.NhanVien).WithMany(p => p.NguoiDungs)
                .HasForeignKey(d => d.NhanVienId)
                .HasConstraintName("FK_NguoiDung_NhanVien");
        });

        modelBuilder.Entity<NhanVien>(entity =>
        {
            entity.ToTable("NhanVien");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("ID");
            entity.Property(e => e.DiaChi).HasMaxLength(150);
            entity.Property(e => e.HoTen).HasMaxLength(50);
            entity.Property(e => e.HoTenKhongDau).HasMaxLength(50);
            entity.Property(e => e.IdphongBan).HasColumnName("IDPhongBan");
            entity.Property(e => e.IdtinhTrangLv).HasColumnName("IDTinhTrangLV");
            entity.Property(e => e.MaNv)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("MaNV");

            entity.HasOne(d => d.IdphongBanNavigation).WithMany(p => p.NhanViens)
                .HasForeignKey(d => d.IdphongBan)
                .HasConstraintName("FK_NhanVien_PhongBan");
        });

        modelBuilder.Entity<PhongBan>(entity =>
        {
            entity.HasKey(e => e.IdphongBan);

            entity.ToTable("PhongBan");

            entity.Property(e => e.IdphongBan)
                .ValueGeneratedNever()
                .HasColumnName("IDPhongBan");
            entity.Property(e => e.Pchn).HasColumnName("PCHN");
            entity.Property(e => e.TenPhongBan).HasMaxLength(50);
        });

        modelBuilder.Entity<Quyen>(entity =>
        {
            entity.HasKey(e => e.Idquyen);

            entity.ToTable("Quyen");

            entity.Property(e => e.Idquyen).HasColumnName("IDQuyen");
            entity.Property(e => e.TenQuyen).HasMaxLength(50);
        });
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
